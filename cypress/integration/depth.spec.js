describe('Verify API Depth endpoint', () => {
    it('verify basic pair=XBTUSD', () => {
        cy.api({url: '/Depth?pair=XBTUSD'}).its('body.result.XXBTZUSD').as('XXBTZUSD')
        cy.get('@XXBTZUSD').then((XXBTZUSD) =>
        {
            const firstAsk = XXBTZUSD.asks[0]
            const firstBid = XXBTZUSD.bids[0]
            expect(Number(firstAsk[0])).to.be.greaterThan(Number(firstBid[0]))
            cy.log(`First Ask is ${firstAsk[0]} and First Bid is ${firstBid[0]}`)
            expect(XXBTZUSD.asks).to.have.length(100)
            expect(XXBTZUSD.bids).to.have.length(100)
        })
    })

    it('verify pair=XBTUSD with extra count param', () => {
        cy.api({url: '/Depth?pair=XBTUSD&count=2'}).its('body.result.XXBTZUSD').as('XXBTZUSD')
        cy.get('@XXBTZUSD').then((XXBTZUSD) =>
        {
            const firstAsk = XXBTZUSD.asks[0]
            const firstBid = XXBTZUSD.bids[0]
            expect(Number(firstAsk[0])).to.be.greaterThan(Number(firstBid[0]))
            cy.log(`First Ask is ${firstAsk[0]} and First Bid is ${firstBid[0]}`)
            expect(XXBTZUSD.asks).to.have.length(2)
            expect(XXBTZUSD.bids).to.have.length(2)
        })
    })

    it('verify wrong pair=XBTUSDx', () => {
        cy.api({url: '/Depth?pair=XBTUSDX'}).its('body').as('body')
        cy.get('@body').then((body) =>
        {
            expect(body).property('error').exist
            expect(body.error).to.contain('EQuery:Unknown asset pair')
            expect(body.error).to.contain('Make it fail')
            cy.log(`Error is ${body.error}`)
        })
    })
})