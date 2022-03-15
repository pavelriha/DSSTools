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
import { NamedRequirementSet } from './namedRequirementSet';

export interface GrouppedRequirementSets { 
    id?: number;
    uuid?: string;
    name?: string;
    nameCS?: string;
    nameEN?: string;
    description?: string;
    descriptionCS?: string;
    descriptionEN?: string;
    /**
     * IFC Identifier
     */
    identifier?: string;
    noteCS?: string;
    noteEN?: string;
    ifcType?: string;
    ifcPredefinedType?: string;
    code?: string;
    path?: Array<number>;
    readonly requirementSets?: Array<NamedRequirementSet>;
    cciSE?: string;
    cciVS?: string;
    cciFS?: string;
    cciTS?: string;
    cciKO?: string;
    cciSK?: string;
}