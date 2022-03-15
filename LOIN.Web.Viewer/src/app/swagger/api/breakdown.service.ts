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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { BreakdownItem } from '../model/breakdownItem';
import { GroupingType } from '../model/groupingType';
import { GrouppedRequirementSets } from '../model/grouppedRequirementSets';
import { GrouppedRequirements } from '../model/grouppedRequirements';
import { OrderingType } from '../model/orderingType';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class BreakdownService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param repositoryId 
     * @param nonEmpty 
     * @param orderBy 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiRepositoryIdBreakdownGet(repositoryId: string, nonEmpty?: boolean, orderBy?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<BreakdownItem>>;
    public apiRepositoryIdBreakdownGet(repositoryId: string, nonEmpty?: boolean, orderBy?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<BreakdownItem>>>;
    public apiRepositoryIdBreakdownGet(repositoryId: string, nonEmpty?: boolean, orderBy?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<BreakdownItem>>>;
    public apiRepositoryIdBreakdownGet(repositoryId: string, nonEmpty?: boolean, orderBy?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (repositoryId === null || repositoryId === undefined) {
            throw new Error('Required parameter repositoryId was null or undefined when calling apiRepositoryIdBreakdownGet.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (nonEmpty !== undefined && nonEmpty !== null) {
            queryParameters = queryParameters.set('nonEmpty', <any>nonEmpty);
        }
        if (orderBy !== undefined && orderBy !== null) {
            queryParameters = queryParameters.set('orderBy', <any>orderBy);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;odata.metadata=minimal;odata.streaming=true',
            'application/json;odata.metadata=minimal;odata.streaming=false',
            'application/json;odata.metadata=minimal',
            'application/json;odata.metadata=full;odata.streaming=true',
            'application/json;odata.metadata=full;odata.streaming=false',
            'application/json;odata.metadata=full',
            'application/json;odata.metadata=none;odata.streaming=true',
            'application/json;odata.metadata=none;odata.streaming=false',
            'application/json;odata.metadata=none',
            'application/json;odata.streaming=true',
            'application/json;odata.streaming=false',
            'application/json',
            'application/xml',
            'application/prs.odatatestxx-odata',
            'text/plain',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<BreakdownItem>>('get',`${this.basePath}/api/${encodeURIComponent(String(repositoryId))}/breakdown`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param repositoryId 
     * @param groupingType 
     * @param select OData select expression
     * @param filter OData filter expression
     * @param orderby OData order-by expression
     * @param skip OData &#x27;skip&#x27; attribute. Usable for paging.
     * @param top OData &#x27;top&#x27; attribute. Usable for paging.
     * @param apply OData &#x27;apply&#x27; attribute. Usable for grouping, aggregations etc.
     * @param actors Coma separated list of actors (id) for the context filtering
     * @param reasons Coma separated list of reasons (id) for the context filtering
     * @param breakdown Coma separated list of breakdown items (id) for the context filtering
     * @param milestones Coma separated list of milestones (id) for the context filtering
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiRepositoryIdBreakdownRequirementSetsGet(repositoryId: string, groupingType?: GroupingType, select?: string, filter?: string, orderby?: string, skip?: number, top?: number, apply?: string, actors?: string, reasons?: string, breakdown?: string, milestones?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<GrouppedRequirementSets>>;
    public apiRepositoryIdBreakdownRequirementSetsGet(repositoryId: string, groupingType?: GroupingType, select?: string, filter?: string, orderby?: string, skip?: number, top?: number, apply?: string, actors?: string, reasons?: string, breakdown?: string, milestones?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<GrouppedRequirementSets>>>;
    public apiRepositoryIdBreakdownRequirementSetsGet(repositoryId: string, groupingType?: GroupingType, select?: string, filter?: string, orderby?: string, skip?: number, top?: number, apply?: string, actors?: string, reasons?: string, breakdown?: string, milestones?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<GrouppedRequirementSets>>>;
    public apiRepositoryIdBreakdownRequirementSetsGet(repositoryId: string, groupingType?: GroupingType, select?: string, filter?: string, orderby?: string, skip?: number, top?: number, apply?: string, actors?: string, reasons?: string, breakdown?: string, milestones?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (repositoryId === null || repositoryId === undefined) {
            throw new Error('Required parameter repositoryId was null or undefined when calling apiRepositoryIdBreakdownRequirementSetsGet.');
        }












        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (groupingType !== undefined && groupingType !== null) {
            queryParameters = queryParameters.set('groupingType', <any>groupingType);
        }
        if (select !== undefined && select !== null) {
            queryParameters = queryParameters.set('$select', <any>select);
        }
        if (filter !== undefined && filter !== null) {
            queryParameters = queryParameters.set('$filter', <any>filter);
        }
        if (orderby !== undefined && orderby !== null) {
            queryParameters = queryParameters.set('$orderby', <any>orderby);
        }
        if (skip !== undefined && skip !== null) {
            queryParameters = queryParameters.set('$skip', <any>skip);
        }
        if (top !== undefined && top !== null) {
            queryParameters = queryParameters.set('$top', <any>top);
        }
        if (apply !== undefined && apply !== null) {
            queryParameters = queryParameters.set('$apply', <any>apply);
        }
        if (actors !== undefined && actors !== null) {
            queryParameters = queryParameters.set('actors', <any>actors);
        }
        if (reasons !== undefined && reasons !== null) {
            queryParameters = queryParameters.set('reasons', <any>reasons);
        }
        if (breakdown !== undefined && breakdown !== null) {
            queryParameters = queryParameters.set('breakdown', <any>breakdown);
        }
        if (milestones !== undefined && milestones !== null) {
            queryParameters = queryParameters.set('milestones', <any>milestones);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;odata.metadata=minimal;odata.streaming=true',
            'application/json;odata.metadata=minimal;odata.streaming=false',
            'application/json;odata.metadata=minimal',
            'application/json;odata.metadata=full;odata.streaming=true',
            'application/json;odata.metadata=full;odata.streaming=false',
            'application/json;odata.metadata=full',
            'application/json;odata.metadata=none;odata.streaming=true',
            'application/json;odata.metadata=none;odata.streaming=false',
            'application/json;odata.metadata=none',
            'application/json;odata.streaming=true',
            'application/json;odata.streaming=false',
            'application/json',
            'application/xml',
            'application/prs.odatatestxx-odata',
            'text/plain',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<GrouppedRequirementSets>>('get',`${this.basePath}/api/${encodeURIComponent(String(repositoryId))}/breakdown/requirement-sets`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param repositoryId 
     * @param ordering 
     * @param select OData select expression
     * @param filter OData filter expression
     * @param orderby OData order-by expression
     * @param skip OData &#x27;skip&#x27; attribute. Usable for paging.
     * @param top OData &#x27;top&#x27; attribute. Usable for paging.
     * @param apply OData &#x27;apply&#x27; attribute. Usable for grouping, aggregations etc.
     * @param actors Coma separated list of actors (id) for the context filtering
     * @param reasons Coma separated list of reasons (id) for the context filtering
     * @param breakdown Coma separated list of breakdown items (id) for the context filtering
     * @param milestones Coma separated list of milestones (id) for the context filtering
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiRepositoryIdBreakdownRequirementsGet(repositoryId: string, ordering?: OrderingType, select?: string, filter?: string, orderby?: string, skip?: number, top?: number, apply?: string, actors?: string, reasons?: string, breakdown?: string, milestones?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<GrouppedRequirements>>;
    public apiRepositoryIdBreakdownRequirementsGet(repositoryId: string, ordering?: OrderingType, select?: string, filter?: string, orderby?: string, skip?: number, top?: number, apply?: string, actors?: string, reasons?: string, breakdown?: string, milestones?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<GrouppedRequirements>>>;
    public apiRepositoryIdBreakdownRequirementsGet(repositoryId: string, ordering?: OrderingType, select?: string, filter?: string, orderby?: string, skip?: number, top?: number, apply?: string, actors?: string, reasons?: string, breakdown?: string, milestones?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<GrouppedRequirements>>>;
    public apiRepositoryIdBreakdownRequirementsGet(repositoryId: string, ordering?: OrderingType, select?: string, filter?: string, orderby?: string, skip?: number, top?: number, apply?: string, actors?: string, reasons?: string, breakdown?: string, milestones?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (repositoryId === null || repositoryId === undefined) {
            throw new Error('Required parameter repositoryId was null or undefined when calling apiRepositoryIdBreakdownRequirementsGet.');
        }












        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (ordering !== undefined && ordering !== null) {
            queryParameters = queryParameters.set('ordering', <any>ordering);
        }
        if (select !== undefined && select !== null) {
            queryParameters = queryParameters.set('$select', <any>select);
        }
        if (filter !== undefined && filter !== null) {
            queryParameters = queryParameters.set('$filter', <any>filter);
        }
        if (orderby !== undefined && orderby !== null) {
            queryParameters = queryParameters.set('$orderby', <any>orderby);
        }
        if (skip !== undefined && skip !== null) {
            queryParameters = queryParameters.set('$skip', <any>skip);
        }
        if (top !== undefined && top !== null) {
            queryParameters = queryParameters.set('$top', <any>top);
        }
        if (apply !== undefined && apply !== null) {
            queryParameters = queryParameters.set('$apply', <any>apply);
        }
        if (actors !== undefined && actors !== null) {
            queryParameters = queryParameters.set('actors', <any>actors);
        }
        if (reasons !== undefined && reasons !== null) {
            queryParameters = queryParameters.set('reasons', <any>reasons);
        }
        if (breakdown !== undefined && breakdown !== null) {
            queryParameters = queryParameters.set('breakdown', <any>breakdown);
        }
        if (milestones !== undefined && milestones !== null) {
            queryParameters = queryParameters.set('milestones', <any>milestones);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;odata.metadata=minimal;odata.streaming=true',
            'application/json;odata.metadata=minimal;odata.streaming=false',
            'application/json;odata.metadata=minimal',
            'application/json;odata.metadata=full;odata.streaming=true',
            'application/json;odata.metadata=full;odata.streaming=false',
            'application/json;odata.metadata=full',
            'application/json;odata.metadata=none;odata.streaming=true',
            'application/json;odata.metadata=none;odata.streaming=false',
            'application/json;odata.metadata=none',
            'application/json;odata.streaming=true',
            'application/json;odata.streaming=false',
            'application/json',
            'application/xml',
            'application/prs.odatatestxx-odata',
            'text/plain',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<GrouppedRequirements>>('get',`${this.basePath}/api/${encodeURIComponent(String(repositoryId))}/breakdown/requirements`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
