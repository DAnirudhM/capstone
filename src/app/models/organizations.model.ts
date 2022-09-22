export class Organizations {
    OrganizationName: string;
    OrganizationId: string;
    Description: string;

    constructor(organizationName: string,
        organizationId: string,
        description: string) {
        this.OrganizationName = organizationName;
        this.OrganizationId = organizationId;
        this.Description = description;
    }
}
