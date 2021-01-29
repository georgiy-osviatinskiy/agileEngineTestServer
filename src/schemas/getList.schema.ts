import * as Joi from 'joi';

export default class GetListSchema {
    get query() {
        return Joi
            .object()
            .keys({
                limit: Joi
                    .number()
                    .positive()
                    .integer()
                    .default(20)
                    .optional(),
                offset: Joi
                    .number()
                    .positive()
                    .integer()
                    .default(0)
                    .optional(),
            });
    }
}
