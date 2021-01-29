import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column, createIndexDecorator,
    DataType,
    ForeignKey, Index,
    Model,
    PrimaryKey,
    Scopes,
    Table,
} from "sequelize-typescript";
import Image from "../image/image.model";
import Tag from "../tag/tag.model";

@Scopes({
    byImage: (imageId) => ({
        where: {imageId}
    })
})
@Table({
    timestamps: true,
    tableName: 'imageTags',
})
export default class ImageTag extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    public id: number;

    @AllowNull(false)
    @ForeignKey(() => Image)
    @Column(DataType.INTEGER.UNSIGNED)
    public imageId: number;

    @AllowNull(false)
    @ForeignKey(() => Tag)
    @Column(DataType.INTEGER.UNSIGNED)
    public tagId: number;

    @BelongsTo(() => Image)
    public image: Image;

    @BelongsTo(() => Tag)
    public tag: Tag;

}