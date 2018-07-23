module.exports = `
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <air:AirExchangeQuoteReq TraceId="{{requestId}}"
                xmlns:air="http://www.travelport.com/schema/air_v45_0"
                xmlns:com="http://www.travelport.com/schema/common_v45_0"
                AuthorizedBy="user"
                TargetBranch="{{TargetBranch}}">

            <com:BillingPointOfSaleInfo
                    xmlns:com="http://www.travelport.com/schema/common_v45_0"
                    OriginApplication="UAPI"/>

            {{#if emulatePcc}}
                <com:OverridePCC ProviderCode="1G"
                                 xmlns:com="http://www.travelport.com/schema/common_v45_0"
                                 PseudoCityCode="{{emulatePcc}}"
                />
            {{/if}}

            <air:ProviderReservationInfo ProviderCode="1G"
                    ProviderLocatorCode="{{pnr}}"
            />

            <air:AirPricingSolution Key="pricing-solution-key">
                {{#each segments}}
                    <air:AirSegment ArrivalTime="{{arrival}}"
                                    DepartureTime="{{departure}}"
                                    Carrier="{{airline}}"
                                    {{#if bookingClass}}
                                    ClassOfService="{{bookingClass}}"
                                    {{/if}}
                                    CabinClass="{{serviceClass}}"
                                    Origin="{{from}}"
                                    Destination="{{to}}"
                                    ETicketability="Yes"
                                    {{#if plane}}
                                    Equipment="{{plane}}"
                                    {{/if}}
                                    FlightNumber="{{flightNumber}}"
                                    LinkAvailability="true"
                                    PolledAvailabilityOption="Polled avail exists"
                                    ProviderCode="1G"
                                    Key="{{@index}}"
                                    {{#if group}}
                                    Group="{{group}}"
                                    {{else}}
                                    Group="0"
                                    {{/if}}>
                        {{#if transfer}}
                            <air:Connection/>
                        {{/if}}
                    </air:AirSegment>
                {{/each}}
            </air:AirPricingSolution>

            <air:RepricingModifiers
                    BulkTicket="false"
                    CreateDate="{{bookingDate}}"
                    PriceClassOfService="ClassBooked">
            </air:RepricingModifiers>
            <air:OriginalItineraryDetails
                    BulkTicket="false"
                    TicketingDate="{{bookingDate}}">
            </air:OriginalItineraryDetails>
        </air:AirExchangeQuoteReq>
    </soap:Body>
</soap:Envelope>
`;
