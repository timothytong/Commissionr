export default class {
    static getErrorMessageIfNullFieldExists(obj, keys) {
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (!obj[key]) {
                return `[${key}] field cannot be blank.`;
            }
        }
        return null;
    }

    static getErrorMessageIfInvalidStringLength (str, fieldName, lenLimits) {
        if (str.length < lenLimits[0]) {
            return `[${fieldName}] is too short. (${lenLimits[0]} - ${lenLimits[1]} characters)`;
        } else if (str.length > lenLimits[1]) {
            return `[${fieldName}] is too long. (${lenLimits[0]} - ${lenLimits[1]} characters)`;
        }
        return null;
    }
}

