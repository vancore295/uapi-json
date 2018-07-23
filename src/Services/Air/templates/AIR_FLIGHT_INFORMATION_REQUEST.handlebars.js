module.exports = `
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:air="http://www.travelport.com/schema/air_v45_0"
    xmlns:com="http://www.travelport.com/schema/common_v45_0">
    <soapenv:Header/>
    <soapenv:Body>
        <air:FlightInformationReq TargetBranch="{{TargetBranch}}">
            <com:BillingPointOfSaleInfo OriginApplication="uAPI"/>
            {{#flightInfoCriteria}}
            <air:FlightInfoCriteria
                Carrier="{{airline}}"
                DepartureDate="{{departure}}"
                FlightNumber="{{flightNumber}}"
                Key=""
            />
            {{/flightInfoCriteria}}
            {{#if emulatePcc}}
            <com:OverridePCC ProviderCode="1G" PseudoCityCode="{{emulatePcc}}"/>
            {{/if}}
        </air:FlightInformationReq>
    </soapenv:Body>
</soapenv:Envelope>
`;
