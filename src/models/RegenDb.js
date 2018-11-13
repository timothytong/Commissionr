import UserModels from './user';
import CommissionFormModels from './commisionForm';
import FormAttributeModels from './formAttribute';
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
        .then(() => CommissionFormModels.commissionFormDb.bulkCreate([
        	{
                id: 1,
                is_open: true,
                user_id: 1,
        	},
        	{
                id: 2,
                is_open: false,
                user_id: 1,
        	}
        ]))
        .then(() => FormAttributeModels.formAttributeDb.bulkCreate([
            {
                id: 1,
                attr: 'Attr for form 1',
                description: 'desc 1',
                additional_cost: 0,
                comm_form_id: 1,
            },
            {
                id: 2,
                attr: 'Attr for form 2',
                description: 'desc 2',
                additional_cost: 5,
                comm_form_id: 2,
            },
            {
                id: 3,
                attr: 'Attr for form 3',
                description: 'desc 3',
                additional_cost: 10,
                comm_form_id: 1,
            },

        ]))
        .catch((e) => console.log('Error: ' + e + '\nHint: Is your postgres running?'));

}
