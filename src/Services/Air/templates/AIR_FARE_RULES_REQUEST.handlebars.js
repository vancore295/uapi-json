module.exports = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <air:AirFareRulesReq
            TraceId="test" AuthorizedBy="{{requestId}}" TargetBranch="{{TargetBranch}}"
            RetrieveProviderReservationDetails="false" FareRuleType="long"
            xmlns:air="http://www.travelport.com/schema/air_v45_0"
            xmlns:com="http://www.travelport.com/schema/common_v45_0"
            >
            <com:BillingPointOfSaleInfo OriginApplication="uAPI" xmlns:com="http://www.travelport.com/schema/common_v45_0"/>
            <air:FareRuleKey FareInfoRef="0" ProviderCode="1G">{{uapi_fare_rule_key}}</air:FareRuleKey>
            {{#each provider_cmds}}
            <air:AirFareDisplayRuleKey ProviderCode="1G">{{this}}</air:AirFareDisplayRuleKey>
            {{/each}}
            {{#if emulatePcc}}
            <com:OverridePCC ProviderCode="1G" PseudoCityCode="{{emulatePcc}}"/>
            {{/if}}
        </air:AirFareRulesReq>
    </soapenv:Body>
</soapenv:Envelope>
`;
