import UserModels from './user';
import Database from './Database';

export default function () {
    Database.sync({ force: true })
        .then(() => UserModels.userDb.bulkCreate([
            { user_name: 'laetansx', email: 'laetansx@gmail.com', password: 'default1', active: true },
            { user_name: 'ckhyena', email: 'ckhyena@gmail.com', password: 'default1', active: true },
            { user_name: 'cupidthedeer', email: 'cupidthedeer@jail.com', password: 'default1', active: false },
        ]))
        .catch((e) => console.log('Error: ' + e + '\nHint: Is your postgres running?'));
}
