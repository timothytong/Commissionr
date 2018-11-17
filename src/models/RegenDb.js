import Database from './Database';

import CommFormResponseModels from './commFormResponse';
import CommissionFormModels from './commisionForm';
import OfferModels from './offer';
import ProductModels from './product';
import UserModels from './user';

export default function () {
    Database.sync({ force: true })
        .then(() => UserModels.user.bulkCreate([
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
        .then(() => CommissionFormModels.commissionForm.bulkCreate([
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
        .then(() => ProductModels.product.bulkCreate([
            {
                id: 1,
                base_price: 10.00,
                description: 'desc 1',
                examples: '["https://files.allaboutbirds.net/wp-content/uploads/2009/04/PronothotaryWarbler_LarryKeller.jpg", "https://cdn.audubon.org/cdn/farfuture/xX2dO2IN71t0tfGOITDQ0HSLNOml6xiRu_z3MU6Xx5M/mtime:1486669862/sites/default/files/styles/engagement_card/public/sfw_apa_2013_28342_232388_briankushner_blue_jay_kk_high.jpg?itok=ttMfUhUu"]',
                is_deleted: false,
                is_sfw: true,
                name: 'Product 1',
                comm_form_id: 1,
                user_id: 1,
            },
            {
                id: 2,
                base_price: 5.00,
                description: 'desc 2',
                examples: null,
                is_deleted: true,
                is_sfw: true,
                name: 'Product 2',
                comm_form_id: 1,
                user_id: 1,
            },
            {
                id: 3,
                base_price: 15.00,
                description: 'desc 3',
                examples: '["https://cdn.audubon.org/cdn/farfuture/xX2dO2IN71t0tfGOITDQ0HSLNOml6xiRu_z3MU6Xx5M/mtime:1486669862/sites/default/files/styles/engagement_card/public/sfw_apa_2013_28342_232388_briankushner_blue_jay_kk_high.jpg?itok=ttMfUhUu"]',
                is_deleted: false,
                is_sfw: false,
                name: 'Product 3',
                comm_form_id: 1,
                user_id: 1,
            },
        ]))
        .then(() => OfferModels.offer.bulkCreate([
            {
                id: 1,
                form_content: '[]',
                comm_form_id: 1,
                product_id: 1,
            },
            {
                id: 2,
                form_content: '[]',
                comm_form_id: 1,
                product_id: 2,
            },
        ]))
        .then(() => CommFormResponseModels.commFormResponse.bulkCreate([
            {
                id: 1,
                content: '[]',
                final_price: 15,
                is_voided: false,
                is_accepted: true,
                user_id: 1,
                comm_form_id: 1,
            },
            {
                id: 2,
                content: '[]',
                final_price: 10,
                is_voided: true,
                is_accepted: false,
                user_id: 1,
                comm_form_id: 1,
            },
        ]))
        .catch((e) => console.log('Error: ' + e));

}
