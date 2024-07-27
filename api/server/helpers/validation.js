export const isValid = (schema) => {
  return (req, res, next) => {
    const valRes = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      { abortEarly: false }
    );
    if (valRes.error) {
      const errMsgs = valRes.error.details.map((obj) => {
        return obj.message + " ";
      });
      return next(new Error(errMsgs));
    }

    return next();
  };
};
