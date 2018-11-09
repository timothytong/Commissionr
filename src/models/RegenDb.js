import UserModels from './user';
import PostModels from './post';
import AttributeModels from './attribute';
import Database from './Database';

export default function () {
    Database.sync({ force: true })
        .then(() => UserModels.userDb.bulkCreate([
            {
                id: 1,
                user_name: 'ckhyena',
                display_name: 'CK',
                email: 'ckhyena@gmail.com',
                password: '$2a$10$07AA5rKbjovcnZVsY36LIOJXcAwOdTPqqops0Lbv9GVhzILG0cAuO',
                dob: '1995-12-15',
                is_active: true,
                is_verified: false,
                is_merchant: true,
                show_nsfw: false,
            }
        ]))
        .then(() => PostModels.postDb.bulkCreate([
        	{
        		name: 'Ck',
        		last_seen: '2017-11-29T05:40:35.324Z',
        		reward: 0.00,
        		longitude: 45,
        		latitude: 50,
                city: 'Seattle',
                state: 'WA',
                country: 'USA',
        		contact: 'hello@gmail.com',
        		description: 'Blue yeen',
        		found: false,
        		found_user_id: null,
                formatted_address: '1 Bellvue Ave, Seattle, WA, USA',
        		deleted: false,
        		submitter_user_id: 1
        	}
        ]))
        .then(() => AttributeModels.attributeDb.bulkCreate([
            {
                id: 1,
                key: 'sashimi',
                value: 'salmon',
                post_id: 1,
            },
            {
                id: 2,
                key: 'cringe',
                value: 'furry',
                post_id: 2,
            },
            {
                id: 3,
                key: 'oh hai',
                value: 'mark',
                post_id: 2,
            }

        ]))
        .catch((e) => console.log('Error: ' + e + '\nHint: Is your postgres running?'));

}
