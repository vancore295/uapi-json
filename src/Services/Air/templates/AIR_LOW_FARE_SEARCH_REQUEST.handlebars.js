"use strict";

module.exports = `
<!--Release 42-->
<!--Version Dated as of 14/Aug/2015 18:47:44-->
<!--Air Low Fare Search For Galileo(1G) Request-->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <air:LowFareSearchReq
            AuthorizedBy="user" TraceId="{{requestId}}" TargetBranch="{{TargetBranch}}"
            ReturnUpsellFare="true"
            ReturnBrandedFares="true"
            CheckOBFees="All"
            xmlns:air="http://www.travelport.com/schema/air_v42_0"
            xmlns:com="http://www.travelport.com/schema/common_v42_0"
            >
            <com:BillingPointOfSaleInfo OriginApplication="uAPI"/>
            {{#legs}}
            <air:SearchAirLeg>
                <air:SearchOrigin>
                    <com:CityOrAirport Code="{{from}}" PreferCity="true"/>
                </air:SearchOrigin>
                <air:SearchDestination>
                    <com:CityOrAirport Code="{{to}}" PreferCity="true"/>
                </air:SearchDestination>
                <air:SearchDepTime PreferredTime="{{departureDate}}"/>
                <air:AirLegModifiers>
                    {{#if ../cabins}}
                    <air:PreferredCabins>
                        {{#each ../cabins}}
                        <com:CabinClass Type="{{this}}"/>
                        {{/each}}
                    </air:PreferredCabins>
                    {{/if}}
                </air:AirLegModifiers>
            </air:SearchAirLeg>
            {{/legs}}
            <air:AirSearchModifiers
                {{#if maxJourneyTime}}
                    MaxJourneyTime="{{maxJourneyTime}}"
                {{/if}}
            >
                <air:PreferredProviders>
                    <com:Provider Code="1G" xmlns:com="http://www.travelport.com/schema/common_v42_0"/>
                </air:PreferredProviders>
                {{#if carriers}}
                <air:PermittedCarriers>
                    {{#carriers}}
                        <com:Carrier Code="{{.}}" xmlns:com="http://www.travelport.com/schema/common_v42_0"/>
                    {{/carriers}}
                </air:PermittedCarriers>
                {{/if}}
            </air:AirSearchModifiers>
            {{#passengers}}
            <com:SearchPassenger Code="{{ageCategory}}"{{#if child}} Age="9"{{/if}} xmlns:com="http://www.travelport.com/schema/common_v42_0"/>
            {{/passengers}}
            {{#if pricing}}
            <air:AirPricingModifiers
                {{#if pricing.currency}}
                CurrencyType="{{pricing.currency}}"
                {{/if}}

                {{#if pricing.eTicketability}}
                ETicketability="{{pricing.eTicketability}}"
                {{/if}}
                ReturnFareAttributes="true"
                ReturnServices="true"
            />
            {{/if}}
            {{#if emulatePcc}}
            <air:PCC>
                <com:OverridePCC ProviderCode="1G" PseudoCityCode="{{emulatePcc}}"/>
            </air:PCC>
            {{/if}}
        </air:LowFareSearchReq>
    </soap:Body>
</soap:Envelope>
`;