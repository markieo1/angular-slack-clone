/**
 * Model representing an group
 */
export class Group {
    /**
     * The id of the group
     */
    public id: string;

    /**
     * The name of the group
     */
    public name: string;

    /**
     * The creation date of the group
     */
    createdAt: Date;

    /**
     * The last update date of the group
     */
    updatedAt: Date;

    /**
     * The reference to the messages send in the group
     */
    messages: [string];
}
