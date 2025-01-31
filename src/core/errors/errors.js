class ValidationError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
    this.field = field; // Adiciona o campo relacionado ao erro
  }
}

module.exports = {
  ValidationError,
};