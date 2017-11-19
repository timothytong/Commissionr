export default class Logger {
    constructor() {}

    error(context: string, err, message): void {
        console.log('ERROR:\n\tContext: %s\n\tError Type: %s\n\tMessage: %s', context, err.name, message);

        if (err.name === 'SequelizeUniqueConstraintError') {
            let msg = err.errors[0].message.replace(/_/g, ' ');
            msg = msg.replace(/must be unique/g, 'is already in use.');

            return {
                message: msg,
                value: err.errors[0].value,
            };
        }
    }
}
