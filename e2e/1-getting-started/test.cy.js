const {_} = Cypress;
describe('test login inquiry',()=>{
    beforeEach(()=>{
        cy.visit('https://192.168.55.53:1195/Inquiry');
    })
    it('isLogin',()=>{
        cy.contains('เข้าสู่ระบบ');
    })
    it('type username and password and click login failed',()=>{
        cy.get('[data-testid="username"]').type('620049');
        cy.get('[data-testid="password"]').type('01234');
        cy.intercept('POST','https://192.168.55.53:1195/InquiryApi/api/user/login').as('Login');
        cy.get('[data-testid="login"]').click().wait('@Login',{timeout:10000}).its('response.statusCode').should('eq',401);
    });
    it('type username and password and click login',()=>{
        cy.get('[data-testid="username"]').type('620049');
        cy.get('[data-testid="password"]').type('0');
        cy.intercept('POST','https://192.168.55.53:1195/InquiryApi/api/user/login').as('Login');
        // cy.get('[data-testid="login"]').click().wait('@Login',{timeout:10000}).its('response.statusCode').should('eq',200);
        cy.get('[data-testid="login"]').click().wait('@Login',{timeout:10000}).its('response').should((res)=>{
            expect(res?.body).to.have.property('userId').to.deep.eq('620049');
        });

    })
})