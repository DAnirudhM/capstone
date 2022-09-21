export class Organizations {
    organizationName: string;
    organizationId: string;
    description: string;

    constructor(organizationName: string,
        organizationId: string,
        description: string) {
        this.organizationName = organizationName;
        this.organizationId = organizationId;
        this.description = description;
    }
}
