declare namespace Express {
  type File = {
    file: string;
    mimetype: string;
  };

  interface Request {
    files?: Record<string, File>;
  }
}

declare namespace Express {
  type Flash = {
    dto?: Record<string, unknown>;
    errors?: Record<string, string>;
    message: string;
    status: "error" | "fail" | "success";
  };

  interface Request {
    session: {
      flash?: Flash;
    };
  }

  interface Response {
    flash: (flash: Flash) => Response;
  }
}

declare namespace Express {
  type User = {
    _id: string;
    email: string;
    password: Buffer<ArrayBufferLike>;
    salt: BinaryLike;
  };
}
