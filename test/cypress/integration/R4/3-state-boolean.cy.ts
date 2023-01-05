import { AddFormToPageTestPage } from "../../support/addFormToPageTest.po";
import * as util from "../../support/util";
const po = new AddFormToPageTestPage();

// Tests of the support for answerExpression on choice, open-choice, and
// string, date, time and integer
describe('3 states boolean type', () => {
  beforeEach(()=>{
    cy.visit('test/pages/addFormToPageTest.html');
  });
  
  it('should export 3 different values on boolean item', () => {
    util.addFormToPage('enableWhen-test.R4.json', null, {fhirVersion: 'R4'});

    cy.byId('Q1/1/1true').find('input').should('not.be.checked');
    cy.byId('Q1/1/1false').find('input').should('not.be.checked');
    cy.byId('Q1/1/1null').find('input').should('be.checked');
        
    // "Not Answered" is not in QR
    cy.window().then((win) => {
      let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      expect(qr.item).to.equal(undefined);

      // select "Yes"
      cy.byId('Q1/1/1true').find('input').click();
      cy.window().then((win) => {
        let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
        expect(qr.item[0].linkId).to.equal('g1');
        expect(qr.item[0].item[0].linkId).to.equal('Q1');
        expect(qr.item[0].item[0].answer[0].valueBoolean).to.equal(true);
  
        // select "No"
        cy.byId('Q1/1/1false').find('input').click();
        cy.window().then((win) => {
          let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
          expect(qr.item[0].linkId).to.equal('g1');
          expect(qr.item[0].item[0].linkId).to.equal('Q1');
          expect(qr.item[0].item[0].answer[0].valueBoolean).to.equal(false);

          // select "Not Answered" again
          cy.byId('Q1/1/1null').find('input').click();
          cy.window().then((win) => {
            let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
            expect(qr.item).to.equal(undefined);
          });  
        });  
      });
    });
  });

  it('should set the boolean values correctly when loading data from QuestionnaireResponse', () => {
    util.addFormToPage('enableWhen-test.R4.json', null, {fhirVersion: 'R4'});
    // select "Yes"
    cy.byId('Q1/1/1true').find('input').click();
    cy.window().then((win) => {
      let q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, "R4");

      // merged qr where boolean item has no value
      let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, "R4");
      win.LForms.Util.addFormToPage(mergedFormData, "formContainer");
      cy.get('.lhc-form-title').contains('Questionnaire for enableWhen Tests');
      cy.byId('Q1/1/1true').find('input').should('be.checked');
      cy.byId('Q1/1/1false').find('input').should('not.be.checked');
      cy.byId('Q1/1/1null').find('input').should('not.be.checked');
    });

    // select "No"
    cy.byId('Q1/1/1false').find('input').click();
    cy.window().then((win) => {
      let q = win.LForms.Util.getFormFHIRData('Questionnaire', 'R4');
      let qr = win.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      let formDef = win.LForms.Util.convertFHIRQuestionnaireToLForms(q, "R4");

      // merged qr where boolean item has no value
      let mergedFormData = win.LForms.Util.mergeFHIRDataIntoLForms(qr, formDef, "R4");
      win.LForms.Util.addFormToPage(mergedFormData, "formContainer");
      cy.get('.lhc-form-title').contains('Questionnaire for enableWhen Tests');
      cy.byId('Q1/1/1true').find('input').should('not.be.checked');
      cy.byId('Q1/1/1false').find('input').should('be.checked');
      cy.byId('Q1/1/1null').find('input').should('not.be.checked');
    });

  });

  
});

