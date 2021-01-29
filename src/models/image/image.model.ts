import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Scopes,
    Table,
} from 'sequelize-typescript';
import {Op} from "sequelize";
import ImageTag from "../imageTag/imageTag.model";
import Tag from "../tag/tag.model";

@Scopes({
    pagination: (query) => ({limit: query.limit, offset: query.offset}),
    withTags: () => ({
        include: [{
            model: Tag,
            as: 'tags'
        }]
    }),
    byGuid: (guid) => ({where: {guid}}),
    search: (query) => ({
        where: {
            [Op.or]: [
                {guid: {[Op.like]: `%${query}%`}},
                {author: {[Op.like]: `%${query}%`}},
                {camera: {[Op.like]: `%${query}%`}},
            ]
        }
    })
})
@Table({
    timestamps: true,
    tableName: 'images',
})
export default class Image extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    public id: number;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    public guid: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    public croppedPicture: string;

    @AllowNull(true)
    @Column(DataType.STRING(255))
    public author: string;

    @AllowNull(true)
    @Column(DataType.STRING(255))
    public camera: string;

    @AllowNull(true)
    @Column(DataType.STRING(255))
    public fullPicture: string;

    @HasMany(() => ImageTag)
    public imageTags: ImageTag[];

    @BelongsToMany(() => Tag, () => ImageTag)
    public tags: Tag[];

    @BelongsToMany(() => Tag, () => ImageTag)
    public tagsForSearch: Tag[];
}