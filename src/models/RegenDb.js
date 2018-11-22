import Database from './Database';

import CommFormResponse from './commFormResponse';
import Commission from './commission';
import CommissionForm from './commissionForm';
import CommissionStage from './commissionStage';
import CommissionStatus from './commissionStatus';
import CommissionQueue from './commissionQueue';
import Offer from './offer';
import Product from './product';
import User from './user';

export default function () {
    Database.sync({ force: true })
        .then(() => User.bulkCreate([
            {
                id: 1,
                user_name: 'ckhyena',
                display_name: 'CK',
                email: 'ckhyena@gmail.com',
                password: '$2a$10$07AA5rKbjovcnZVsY36LIOJXcAwOdTPqqops0Lbv9GVhzILG0cAuO',
                dob: '1995-12-15',
                is_active: true,
                is_verified: false,
                show_nsfw: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 2,
                user_name: 'itsprobablymars',
                display_name: 'Mars',
                email: 'itsprobablymars@gmail.com',
                password: '$2a$10$07AA5rKbjovcnZVsY36LIOJXcAwOdTPqqops0Lbv9GVhzILG0cAuO',
                dob: '1995-12-15',
                is_active: true,
                is_verified: true,
                show_nsfw: true,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]))
        .then(() => CommissionForm.bulkCreate([
        	{
                id: 1,
                is_open: true,
                merchant_user_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
        	},
        	{
                id: 2,
                is_open: false,
                merchant_user_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
        	},
        	{
                id: 3,
                is_open: true,
                merchant_user_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
        	},
        ]))
        .then(() => Product.bulkCreate([
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
                created_at: new Date(),
                updated_at: new Date(),
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
                created_at: new Date(),
                updated_at: new Date(),
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
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]))
        .then(() => Offer.bulkCreate([
            {
                id: 1,
                form_content: '[]',
                comm_form_id: 1,
                product_id: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 2,
                form_content: '[]',
                comm_form_id: 1,
                product_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]))
        .then(() => CommFormResponse.bulkCreate([
            {
                id: 1,
                content: '[]',
                is_voided: false,
                is_accepted: true,
                filled_by_user_id: 1,
                comm_form_id: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 2,
                content: '[]',
                is_voided: true,
                is_accepted: false,
                filled_by_user_id: 1,
                comm_form_id: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]))
        .then(() => CommissionQueue.bulkCreate([
            {
                id: 1,
                name: "Mar's Comm Queue",
                description: 'Just your erryday comm queue',
                user_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]))
        .then(() => Commission.bulkCreate([
            {
                id: 1,
                final_price: 50.00,
                is_paid: false,
                user_id: 1,
                comm_form_id: 1,
                commission_queue_id: 1,
                position_in_queue: 1,
                product_id: 1,
                commissioner_id: 1,
                merchant_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 2,
                final_price: 10.00,
                is_paid: true,
                state: 'cancelled',
                user_id: 1,
                comm_form_id: 1,
                commission_queue_id: 1,
                position_in_queue: 2,
                product_id: 1,
                commissioner_id: 1,
                merchant_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 3,
                final_price: 30.00,
                is_paid: true,
                state: 'completed',
                user_id: 1,
                comm_form_id: 2,
                commission_queue_id: 1,
                position_in_queue: 3,
                product_id: 1,
                commissioner_id: 1,
                merchant_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 4,
                final_price: 130.00,
                is_paid: true,
                state: 'started',
                user_id: 1,
                comm_form_id: 2,
                commission_queue_id: 1,
                position_in_queue: 4,
                product_id: 2,
                commissioner_id: 1,
                merchant_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]))
        .then(() => CommissionStage.bulkCreate([
            {
                id: 1,
                description: 'Just one stage, simple!',
                position: 1,
                product_id: 1,
            },
            {
                id: 2,
                description: 'Two stages. Stage 1',
                position: 1,
                product_id: 2,
            },
            {
                id: 3,
                description: 'Two stages. Stage 2',
                position: 2,
                product_id: 2,
            },
        ]))
        .then(() => CommissionStatus.bulkCreate([
            {
                id: 1,
                wips: '[]',
                commission_id: 4,
                comm_stage_id: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]))
        .then((e) => console.log('\n\n\n\n================\nDatabase seeded successfully\n================'))
        .catch((e) => {
            console.log('\n\n\n\n================\nError: ' + e + '\n================');
            console.log(e)
        });

}
