import moment from 'moment-timezone'

import { businessDay } from '../../src/utils/DateUtils'

describe('Utility functions for dealing with dates', () => {
    it('date is before 2AM', (done) => {
        const testDate = moment.tz("2017-10-30 01:00:00", "America/Toronto");
        const expectedDate = moment.tz("2017-10-29", "America/Toronto");
        const actualDate = businessDay(testDate);

        expect(actualDate.isSame(expectedDate, 'day')).toBe(true);
        done();
    });

    it('date is after 2AM', (done) => {
        const testDate = moment.tz("2017-10-30 10:00:00", "America/Toronto");
        const expectedDate = moment.tz("2017-10-30", "America/Toronto");
        const actualDate = businessDay(testDate);

        expect(actualDate.isSame(expectedDate, 'day')).toBe(true);
        done();
    });

    it('date is equal to 2AM', (done) => {
        const testDate = moment.tz("2017-10-30 02:00:00", "America/Toronto");
        const expectedDate = moment.tz("2017-10-30", "America/Toronto");
        const actualDate = businessDay(testDate);

        expect(actualDate.isSame(expectedDate, 'day')).toBe(true);
        done();
    });
});
