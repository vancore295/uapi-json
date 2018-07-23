module.exports = `
<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:air="http://www.travelport.com/schema/air_v45_0"
  xmlns:com="http://www.travelport.com/schema/common_v45_0"
  >
  <soap:Header/>
  <soap:Body>
    <air:AirRetrieveDocumentReq
            AuthorizedBy="user"
            TargetBranch="{{TargetBranch}}"
            RetrieveProviderReservationDetails="true"
            ReturnRestrictions="true"
            ReturnPricing="true" RetrieveMCO="false"
            ProviderCode="1G"
            {{#if uapi_ur_locator}}
                UniversalRecordLocatorCode="{{uapi_ur_locator}}"
            {{/if}}
            {{#if pnr}}
                ProviderLocatorCode="{{pnr}}"
            {{/if}}
    >
      <com:BillingPointOfSaleInfo OriginApplication="uAPI"/>
      {{#if emulatePcc}}
      <com:OverridePCC ProviderCode="1G" PseudoCityCode="{{emulatePcc}}"/>
      {{/if}}
      <com:TicketNumber>{{ticketNumber}}</com:TicketNumber>
    </air:AirRetrieveDocumentReq>
  </soap:Body>
</soap:Envelope>
`;
