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
    Unique
} from "sequelize-typescript";
import ImageTag from "../imageTag/imageTag.model";
import Image from "../image/image.model";

@Scopes({
    byName: (name) => ({where: {name}})
})
@Table({
    timestamps: true,
    tableName: 'tags',
})
export default class Tag extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    public id: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING(255))
    public name: string;

    @HasMany(() => ImageTag)
    public imageTag: ImageTag;

    @BelongsToMany(() => Image, () => ImageTag)
    public images: Image[];
}