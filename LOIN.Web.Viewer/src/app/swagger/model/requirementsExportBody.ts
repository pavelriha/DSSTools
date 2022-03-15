/**
 * LOIN.Server
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface RequirementsExportBody { 
    fromUrl?: string;
    /**
     * Coma separated list of actors (id) for the context filtering
     */
    actors?: string;
    /**
     * Coma separated list of reasons (id) for the context filtering
     */
    reasons?: string;
    /**
     * Coma separated list of breakdown items (id) for the context filtering
     */
    breakdown?: string;
    /**
     * Coma separated list of milestones (id) for the context filtering
     */
    milestones?: string;
}