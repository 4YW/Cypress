const login = () =>{
    cy.get('[data-testid="username"]').type('620049'); //type username
    cy.get('[data-testid="password"]').type('0'); //type password
    cy.intercept('POST','https://192.168.55.53:1195/InquiryApi/api/user/login').as('LoginApi');
    // cy.get('[data-testid="login"]').click().wait('@LoginApi',{timeout:10000}).its('response.statusCode').should('eq',200);
    cy.get('[data-testid="login"]').click().wait('@LoginApi',{timeout:10000}).its('response').should((res)=>{
        console.log(res);
        expect(res?.body).to.have.property('userId').to.deep.eq('620049'); //body:{userId:620049}
        expect(res?.httpVersion).eq("1.1"); //httpVersion:"1.1"
        expect(res?.statusCode).eq(200); //statusCode:"200"
        expect(res?.body).to.have.property('org').to.be.a('string');
        //body:{status:"Success"}
        // expect(res?.body).to.have.property('status').to.deep.eq('Success'); 

    });
}
const saleList = ['000002','210003'];
const custList = ['CC032','00180'];
const mattypeList = ['CPP','POF'];
const thickList = ['30','20'];
// const gradeList = ['A','B'];
const joint = 0;
const widthList = ['530','14'];
const unitWidthList = ['mm','in'];
const lengthList = ['3000','1067'];
const priceList = ['30','100'];
const rollList = ['10','20'];

describe('test',()=>{
    beforeEach(()=>{
        cy.visit('https://192.168.55.53:1195/Inquiry/#/auth'); //visit the url

        cy.viewport(1920,1080)
    })
    it('login',()=>{
        cy.contains('เข้าสู่ระบบ'); //check text message
    })
    it('type username and password and login failed',()=>{
        cy.get('[data-testid="username"]').type('abcde'); //type username
        cy.get('[data-testid="password"]').type('0'); //type password
        cy.intercept('POST','https://192.168.55.53:1195/InquiryApi/api/user/login').as('LoginApi');
        cy.get('[data-testid="login"]').click().wait('@LoginApi',{timeout:10000}).its('response.statusCode').should('eq',401); //click login
    })

    it('type username and password and login success',()=>{
        cy.get('[data-testid="username"]').type('620049'); //type username
        cy.get('[data-testid="password"]').type('0'); //type password
        cy.intercept('POST','https://192.168.55.53:1195/InquiryApi/api/user/login').as('LoginApi');
        // cy.get('[data-testid="login"]').click().wait('@LoginApi',{timeout:10000}).its('response.statusCode').should('eq',200);
        cy.get('[data-testid="login"]').click().wait('@LoginApi',{timeout:10000}).its('response').should((res)=>{
            console.log(res);
            expect(res?.body).to.have.property('userId').to.deep.eq('620049'); //body:{userId:620049}
            expect(res?.httpVersion).eq("1.1"); //httpVersion:"1.1"
            expect(res?.statusCode).eq(200); //statusCode:"200"
            expect(res?.body).to.have.property('org').to.be.a('string');
            //body:{status:"Success"}
            // expect(res?.body).to.have.property('status').to.deep.eq('Success'); 

        });

        // expect(1+1).to.eq(2);
        // expect('hello').to.include('hell');
        // expect('hello').to.be.a('string');

    })

    it.only('login and createdue in the page',()=>{
        login();

        cy.intercept('GET','https://192.168.55.53:1195/InquiryApi/Inquiry/getdefaultlengthwidthunit',
        {unitWidth:'mm',unitLength:'m.'}).as('default');
        
        cy.get('[data-testid="c_sale"]').type('000002').get('.mat-option').contains('000002').click();
        cy.get('[data-testid="c_cust"]').type('C0001').get('mat-option').contains('C0001').click();

        cy.get('[data-testid="c_chk_newcust"]').check();
        cy.get('[data-testid="c_i_newcust"]').type('testtest');


        cy.intercept('POST','https://192.168.55.53:1195/InquiryApi/Inquiry/getcalsampleweightbyroll').as('WeightQty');
        cy.get('[data-testid="c_i_mattype"]').type(mattypeList[Number(0)]).get('.mat-option').contains((mattypeList[Number(0)]=="POF"?mattypeList[Number(0)]+' Shrink':mattypeList[Number(0)])).click();
                // cy.get('[data-testid="c_i_mattype"]').select(mattypeList[Number(0)])
                cy.get('[data-testid="c_i_thick"]').type(thickList[Number(0)]);
               cy.get('[data-testid="c_i_joint"]').type(joint.toString());
               cy.get('[data-testid="c_i_width"]').type(widthList[Number(0)]);
               cy.get('[data-testid="c_s_unitwidth"]').select(unitWidthList[Number(0)]); 
               cy.get('[data-testid="c_s_unitlength"]').select(unitWidthList[Number(1)]);                
               cy.get('[data-testid="c_i_length"]').type(lengthList[Number(0)]);
               cy.get('[data-testid="c_i_price"]').type(priceList[Number(0)]);
               cy.get('[data-testid="c_i_rollqty"]').type(rollList[Number(0)]);
            //    cy.wait('@WeightQty',{timeout:10000}).its('response.statusCode').should('eq',200);
            
                cy.get('[data-testid="c_i_weightqty"]').should('not.eq',0).and('not.have.value','0.00').and('not.have.value',0.00);

                cy.get('[data-testid="c_btn_add"]').click();
    
            //     cy.contains('แจ้งเตือนลบข้อมูล');
            //  cy.getByTestID('c_btn_del_n').click();
            //  cy.getByTestID('c_btn_del').click();
            //  cy.contains('แจ้งเตือนลบข้อมูล');
            //  cy.getByTestID('c_btn_del_y').click();
        // cy.get('[data-testid="c_sale"]').clear().type('210003').get('mat-option').contains('210003').click();
        
    })

})