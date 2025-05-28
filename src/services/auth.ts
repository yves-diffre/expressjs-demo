import crypto from "node:crypto";
import type { Request } from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import { ConflictError, UnknownEntityError, databases } from "../components/databases";
import { ValidationError, validator } from "../components/validator";
import { SignInDto, SignUpDto } from "../schemas";

databases.client.sqlite.serialize(() => {
  databases.client.sqlite.run(
    `
      CREATE TABLE IF NOT EXISTS users (
        _id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        password BLOB,
        salt BLOB
      )
    `,
  );
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      databases.client.sqlite.get<Express.User>(
        `
          SELECT
            *
          FROM
            users
          WHERE
            email = ?
        `,
        [email],
        (error, user) => {
          if (error) {
            return done(error);
          }

          if (!user) {
            return done(null, false);
          }

          crypto.pbkdf2(password, user.salt, 310000, 32, "sha256", (error, hashedPassword) => {
            if (error) {
              return done(error);
            }

            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false);
            }

            return done(null, user);
          });
        },
      );
    },
  ),
);
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, {
      _id: user._id,
      email: user.email,
    });
  });
});
passport.deserializeUser((user: Express.User, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});

const validateSignUpDto = validator.compile(SignUpDto);
async function signUp(dto: SignUpDto, request: Request) {
  return new Promise<void>((resolve, reject) => {
    const valid = validateSignUpDto(dto);
    if (!valid) {
      return reject(new ValidationError(validateSignUpDto.errors));
    }

    const values = {
      ...dto,
      _id: crypto.randomUUID(),
      salt: crypto.randomBytes(16),
    };
    crypto.pbkdf2(values.password, values.salt, 310000, 32, "sha256", (error, hashedPassword) => {
      if (error) {
        return reject(error);
      }

      databases.client.sqlite.run(
        `
          INSERT INTO
            users (_id, email, password, salt)
          VALUES
            (?, ?, ?, ?)
        `,
        [values._id, values.email, hashedPassword, values.salt],
        (error) => {
          if (error) {
            return reject(
              error.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email"
                ? new ConflictError()
                : error,
            );
          }

          request.logIn(
            {
              _id: values._id,
              email: values.email,
            } as Express.User,
            (error) => {
              if (error) {
                return reject(error);
              }

              return resolve();
            },
          );
        },
      );
    });
  });
}

const validateSignInDto = validator.compile(SignInDto);
async function signIn(dto: SignInDto, request: Request) {
  return new Promise<void>((resolve, reject) => {
    const valid = validateSignInDto(dto);
    if (!valid) {
      return reject(new ValidationError(validateSignInDto.errors));
    }

    passport.authenticate("local", (error: Error, user: Express.User) => {
      if (error) {
        return reject(error);
      }

      if (!user) {
        return reject(new UnknownEntityError());
      }

      request.logIn(user, (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      });
    })(request);
  });
}

async function signOut(request: Request) {
  return new Promise<void>((resolve, reject) => {
    request.logOut((error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
}

export const authServices = {
  signUp,
  signIn,
  signOut,
};
