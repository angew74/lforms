angular.module('lformsWidget').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('form-header.html',
    "<div class=\"stopped\" ng-show=\"isFormDone()\"><img ng-src=\"{{::blankGifDataUrl}}\" class=\"stop-sign\"><span>This form is complete.</span></div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-3 col-xs-3\">\n" +
    "    <div ng-hide=\"{{hideCheckBoxes}}\" class=\"checkbox\">\n" +
    "      <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.showQuestionCode\">Display Question Code</label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3 col-xs-3\">\n" +
    "    <div ng-hide=\"{{hideCheckBoxes}}\" class=\"checkbox\">\n" +
    "      <label><input type=\"checkbox\" value=\"\" ng-model=\"formConfig.showCodingInstruction\">Show Help/Description</label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3 col-xs-3 col-md-offset-3 col-xs-offset-3 \">\n" +
    "    <div style=\"margin: 10px\">Total # of Questions: {{lfData.itemRefs.length}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('form-view-a.html',
    "<div ng-controller=\"PanelTableCtrl\" ng-keydown=\"handleNavigationKeyEvent($event)\">\n" +
    "  <form name=\"panel\" novalidate autocomplete=\"false\">\n" +
    "    <div class=\"panelGroup fieldGroup\" ng-if=\"lfData\" >\n" +
    "      <div ng-include=\"'form-header.html'\"></div>\n" +
    "\n" +
    "      <h3 class=\"groupHeader\">\n" +
    "        <span>{{lfData.name}}</span>\n" +
    "        <span ng-if=\"formConfig.showQuestionCode\">\n" +
    "          <a href=\"http://s.details.loinc.org/LOINC/{{ lfData.code }}.html\" target=\"_blank\">[{{ lfData.code }}]</a></span>\n" +
    "      </h3>\n" +
    "      <div class=\"fieldExpColDiv\">\n" +
    "        <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "          <colgroup>\n" +
    "            <col ng-repeat=\"item in ::lfData.templateOption.obrItems\"\n" +
    "                 ng-style=\"{'width': '{{::item.formatting.width}}',\n" +
    "                            'min-width': '{{::item.formatting['min-width']}}'}\">\n" +
    "          </colgroup>\n" +
    "          <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"fieldsTableHeader\"\n" +
    "                ng-repeat=\"item in ::lfData.templateOption.obrItems\"><label\n" +
    "              for=\"obr_{{::item.question}}\">{{::item.question}}</label></th>\n" +
    "          </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "          <tr class=\"repeatingLine\">\n" +
    "            <td class=\"rowEditText hasTooltip\" ng-repeat=\"item in lfData.templateOption.obrItems\"\n" +
    "                ng-switch on=\"item.dataType\">\n" +
    "              <ng-form name=\"innerForm\">\n" +
    "                <div class=\"cellData tooltipContainer\">\n" +
    "                  <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                  <input ng-switch-when=\"CWE\" name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::isAnswerRequired(item)\" placeholder=\"Select or type a value\"\n" +
    "                         ng-model=\"item._value\"\n" +
    "                         autocomplete-lhc=\"::autocompLhcOpt(item)\" ng-readonly=\"::isReadOnly(item)\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                  <input ng-switch-when=\"DT\" name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::isAnswerRequired(item)\"\n" +
    "                         ng-model=\"item._value\" lf-date=\"::dateOptions\"\n" +
    "                         placeholder=\"MM/DD/YYYY\" ng-readonly=\"::isReadOnly(item)\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                  <input ng-switch-default name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::isAnswerRequired(item)\"\n" +
    "                         ng-model=\"item._value\" placeholder=\"Type a value\"\n" +
    "                         ng-readonly=\"::isReadOnly(item)\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                </div>\n" +
    "              </ng-form>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          <tr class=\"embeddedRow\">\n" +
    "            <td colspan=\"5\">\n" +
    "              <div>\n" +
    "                <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "                  <colgroup>\n" +
    "                    <col ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\"\n" +
    "                         ng-style=\"{'width': '{{::obxCol.formatting.width}}',\n" +
    "                                    'min-width': '{{::obxCol.formatting['min-width']}}'}\">\n" +
    "                  </colgroup>\n" +
    "                  <thead>\n" +
    "                  <tr>\n" +
    "                    <th class=\"fieldsTableHeader\" ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\"\n" +
    "                        id=\"th_{{obxCol.name}}\">{{::obxCol.name}}</th>\n" +
    "                  </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody id=\"obx_table\" class=\"fieldExpColDiv\">\n" +
    "                  <tr class=\"repeatingLine {{ getSkipLogicClass_New(item) }} {{getRowClass(item)}} \"\n" +
    "                      ng-repeat-start=\"item in lfData.itemRefs \" ng-click=\"setActiveRow($index)\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass2($index, item._lastSiblingList)\" ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <span ng-show=\"::isRepeatable_NEW(item)\" class=\"sn\">{{::getRepeatingSN_NEW(item) }}</span>\n" +
    "                              <span><label for=\"{{::item._elementId}}\">{{::item.question}}</label></span>\n" +
    "                              <span ng-show=\"formConfig.showQuestionCode\">\n" +
    "                                <a href=\"http://s.details.loinc.org/LOINC/{{ item.questionCode }}.html\"\n" +
    "                                   target=\"_blank\">[{{ item.questionCode }}]</a></span>\n" +
    "                              <span ng-show=\"formConfig.showCodingInstruction\"\n" +
    "                                    class=\"prompt\">{{ ::getCodingInstructions(item) }}</span>\n" +
    "                              <button ng-show=\"!formConfig.showCodingInstruction\" ng-if=\"::hasCodingInstructions(item)\"\n" +
    "                                      class=\"help-button\" bs-popover=\"::item.codingInstructions\"\n" +
    "                                      data-auto-close=\"true\" data-placement=\"right\"  title=\"Instruction\">?</button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\">\n" +
    "                      <button ng-if=\"!hasOneRepeatingItem_NEW(item)\" class=\"float-button\"\n" +
    "                              ng-click=\"removeOneRepeatingItem_NEW(item)\"\n" +
    "                              title=\"Remove this '{{ ::item.question }}'\">-</button>\n" +
    "                    </td>\n" +
    "                    <td ng-switch on=\"::getFieldType(item)\" class=\"hasTooltip\">\n" +
    "                      <ng-form name=\"innerForm2\">\n" +
    "                        <div class=\"cellData tooltipContainer\">\n" +
    "                          <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                          <span ng-switch-when=\"\" > </span>\n" +
    "                          <input ng-switch-when=\"CNE-1\" name=\"{{::item.question +'_'+ $id}}\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item)\" placeholder=\"Select one or more\"\n" +
    "                                 id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"CWE-1\" name=\"{{::item.question +'_'+ $id}}\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item)\" placeholder=\"Select one or more or type a value\"\n" +
    "                                 id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"REAL1\" name=\"{{::item.question}}\" type=\"number\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" placeholder=\"Type a value\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item )\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"INT1\" name=\"{{::item.question}}\" type=\"number\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" placeholder=\"Type a value\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item )\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"CNE1\" name=\"{{::item.question + '_'+ $id}}\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 placeholder=\"Select one\"\n" +
    "                                 ng-model=\"item._value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"CWE1\" name=\"{{::item.question + '_'+ $id}}\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 placeholder=\"Select one  or type a value\"\n" +
    "                                 ng-model=\"item._value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"DT1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" lf-date=\"::dateOptions\" placeholder=\"MM/DD/YYYY\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item)\"\n" +
    "                                 ng-value=\"runFormula_NEW(item)\" id=\"{{::item._elementId}}\">\n" +
    "                        </div>\n" +
    "                      </ng-form>\n" +
    "                    </td>\n" +
    "                    <td ng-switch on=\"::checkUnits(item)\">\n" +
    "                      <input class=\"units\" ng-switch-when=\"list\"\n" +
    "                             ng-model=\"item._unit\" autocomplete-lhc=\"::unitsAutocompLhcOpt(item)\"\n" +
    "                             placeholder=\"Select one\" aria-labelledby=\"th_Units\">\n" +
    "                      <span ng-switch-when=\"none\" > </span>\n" +
    "                    </td>\n" +
    "                    <!--<td>{{item.range}}</td>-->\n" +
    "                  </tr>\n" +
    "                  <!-- extra question -->\n" +
    "                  <tr ng-if=\"needExtra(item)\" class=\"extra-row repeatingLine {{ getSkipLogicClass_New(item) }} {{getRowClass(item)}}\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass2($index, item._lastSiblingList)\"\n" +
    "                              ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <span>&nbsp;</span>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\"></td>\n" +
    "                    <td colspan=\"5\" class=\"extra-field\">\n" +
    "                      <input ng-model=\"item._valueOther\" placeholder=\"Please specify\" ng-readonly=\"::isReadOnly(item)\">\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  <!--a button row at the end of each repeating section-->\n" +
    "                  <tr ng-repeat-end ng-if=\"item._repeatingSectionList\"\n" +
    "                      class=\"buttonRow repeatingLine {{ getSkipLogicClass_New(item) }} {{getRowClass(item)}}\" >\n" +
    "                    <td colspan=\"6\" class=\"name has_treeline\" >\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass2($index, item._lastSiblingList)\"\n" +
    "                              ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <button ng-repeat=\"repeatingItem in item._repeatingSectionList\"\n" +
    "                                      class=\"float-button\"  id=\"{{repeatingItem._elementId}}\"\n" +
    "                                      ng-click=\"addOneRepeatingItem_NEW(repeatingItem)\"\n" +
    "                                      title=\"Add another '{{ ::repeatingItem.question }}'\">\n" +
    "                                Add another '{{::repeatingItem.question}}'</button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  </tbody>\n" +
    "                </table>\n" +
    "              </div>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "  <button ng-if=\"debug\" ng-click=\"onclick()\">Click to debug Panel Controller</button>\n" +
    "</div>\n"
  );


  $templateCache.put('form-view-b.html',
    "<div ng-controller=\"PanelTableCtrl\" ng-keydown=\"handleNavigationKeyEvent($event)\">\n" +
    "  <form name=\"panel\" novalidate autocomplete=\"false\">\n" +
    "    <div class=\"panelGroup fieldGroup\" ng-if=\"lfData\" >\n" +
    "      <div ng-include=\"'form-header.html'\"></div>\n" +
    "\n" +
    "      <h3 class=\"groupHeader\">\n" +
    "        <span>{{lfData.name}}</span>\n" +
    "        <span ng-if=\"formConfig.showQuestionCode\">\n" +
    "          <a href=\"http://s.details.loinc.org/LOINC/{{ lfData.code }}.html\" target=\"_blank\">[{{ lfData.code }}]</a></span>\n" +
    "      </h3>\n" +
    "      <div class=\"fieldExpColDiv\">\n" +
    "        <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "          <colgroup>\n" +
    "            <col ng-repeat=\"item in ::lfData.templateOption.obrItems\"\n" +
    "                 ng-style=\"{'width': '{{::item.formatting.width}}',\n" +
    "                            'min-width': '{{::item.formatting['min-width']}}'}\">\n" +
    "          </colgroup>\n" +
    "          <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"fieldsTableHeader\"\n" +
    "                ng-repeat=\"item in ::lfData.templateOption.obrItems\"><label\n" +
    "              for=\"obr_{{::item.question}}\">{{::item.question}}</label></th>\n" +
    "          </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "          <tr class=\"repeatingLine\">\n" +
    "            <td class=\"rowEditText hasTooltip\" ng-repeat=\"item in lfData.templateOption.obrItems\"\n" +
    "                ng-switch on=\"item.dataType\">\n" +
    "              <ng-form name=\"innerForm\">\n" +
    "                <div class=\"cellData tooltipContainer\">\n" +
    "                  <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                  <input ng-switch-when=\"CWE\" name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::isAnswerRequired(item)\" placeholder=\"Select or type a value\"\n" +
    "                         ng-model=\"item._value\"\n" +
    "                         autocomplete-lhc=\"::autocompLhcOpt(item)\" ng-readonly=\"::isReadOnly(item)\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                  <input ng-switch-when=\"DT\" name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::isAnswerRequired(item)\"\n" +
    "                         ng-model=\"item._value\" lf-date=\"::dateOptions\"\n" +
    "                         placeholder=\"MM/DD/YYYY\" ng-readonly=\"::isReadOnly(item)\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                  <input ng-switch-default name=\"{{::item.question}}\"\n" +
    "                         ng-required=\"::isAnswerRequired(item)\"\n" +
    "                         ng-model=\"item._value\" placeholder=\"Type a value\"\n" +
    "                         ng-readonly=\"::isReadOnly(item)\"\n" +
    "                         id=\"obr_{{::item.question}}\">\n" +
    "                </div>\n" +
    "              </ng-form>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          <tr class=\"embeddedRow\">\n" +
    "            <td colspan=\"5\">\n" +
    "              <div>\n" +
    "                <table cellspacing=\"0\" cellpadding=\"0\" class=\"fieldsTable\">\n" +
    "                  <colgroup>\n" +
    "                    <col ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\"\n" +
    "                         ng-style=\"{'width': '{{::obxCol.formatting.width}}',\n" +
    "                                    'min-width': '{{::obxCol.formatting['min-width']}}'}\">\n" +
    "                  </colgroup>\n" +
    "                  <thead>\n" +
    "                  <tr>\n" +
    "                    <th class=\"fieldsTableHeader\" ng-repeat=\"obxCol in ::lfData.templateOption.obxTableColumns\"\n" +
    "                        id=\"th_{{obxCol.name}}\">{{::obxCol.name}}</th>\n" +
    "                  </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody id=\"obx_table\" class=\"fieldExpColDiv\">\n" +
    "                  <tr class=\"repeatingLine {{ getSkipLogicClass_New(item) }} {{getRowClass(item)}} \"\n" +
    "                      ng-repeat-start=\"item in lfData.itemRefs \" ng-click=\"setActiveRow($index)\">\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" class=\"name has_treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getTreeLevelClass2($index, item._lastSiblingList)\" ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <span ng-show=\"::isRepeatable_NEW(item)\" class=\"sn\">{{::getRepeatingSN_NEW(item) }}</span>\n" +
    "                              <span><label for=\"{{::item._elementId}}\">{{::item.question}}</label></span>\n" +
    "                              <span ng-show=\"formConfig.showQuestionCode\">\n" +
    "                                <a href=\"http://s.details.loinc.org/LOINC/{{ item.questionCode }}.html\"\n" +
    "                                   target=\"_blank\">[{{ item.questionCode }}]</a></span>\n" +
    "                              <span ng-show=\"formConfig.showCodingInstruction\"\n" +
    "                                    class=\"prompt\">{{ ::getCodingInstructions(item) }}</span>\n" +
    "                              <button ng-show=\"!formConfig.showCodingInstruction\" ng-if=\"::hasCodingInstructions(item)\"\n" +
    "                                      class=\"help-button\" bs-popover=\"::item.codingInstructions\"\n" +
    "                                      data-auto-close=\"true\" data-placement=\"right\"  title=\"Instruction\">?</button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" class=\"button-col\">\n" +
    "                      <button ng-if=\"!hasOneRepeatingItem_NEW(item)\" class=\"float-button\"\n" +
    "                              ng-click=\"removeOneRepeatingItem_NEW(item)\"\n" +
    "                              title=\"Remove this '{{ ::item.question }}'\">-</button>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" ng-switch on=\"::getFieldType(item)\" class=\"hasTooltip\">\n" +
    "                      <ng-form name=\"innerForm2\">\n" +
    "                        <div class=\"cellData tooltipContainer\">\n" +
    "                          <span class=\"tooltipContent\" ng-include=\"'validation.html'\"></span>  <!-- validation error messages -->\n" +
    "                          <span ng-switch-when=\"\" > </span>\n" +
    "                          <input ng-switch-when=\"CNE-1\" name=\"{{::item.question +'_'+ $id}}\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item)\" placeholder=\"Select one or more\"\n" +
    "                                 id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"CWE-1\" name=\"{{::item.question +'_'+ $id}}\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item)\" placeholder=\"Select one or more or type a value\"\n" +
    "                                 id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"REAL1\" name=\"{{::item.question}}\" type=\"number\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" placeholder=\"Type a value\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item )\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"INT1\" name=\"{{::item.question}}\" type=\"number\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" placeholder=\"Type a value\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item )\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"CNE1\" name=\"{{::item.question + '_'+ $id}}\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 placeholder=\"Select one\"\n" +
    "                                 ng-model=\"item._value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"CWE1\" name=\"{{::item.question + '_'+ $id}}\"\n" +
    "                                 ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 placeholder=\"Select one  or type a value\"\n" +
    "                                 ng-model=\"item._value\" autocomplete-lhc=\"::autocompLhcOpt(item)\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-when=\"DT1\" name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" lf-date=\"::dateOptions\" placeholder=\"MM/DD/YYYY\"\n" +
    "                                 ng-readonly=\"::isReadOnly(item)\" id=\"{{::item._elementId}}\">\n" +
    "                          <input ng-switch-default name=\"{{::item.question}}\" ng-required=\"::isAnswerRequired(item)\"\n" +
    "                                 ng-model=\"item._value\" placeholder=\"Type a value\" ng-readonly=\"::isReadOnly(item)\"\n" +
    "                                 ng-value=\"runFormula_NEW(item)\" id=\"{{::item._elementId}}\">\n" +
    "                        </div>\n" +
    "                      </ng-form>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"::!item._inHorizontalTable\" ng-switch on=\"::checkUnits(item)\">\n" +
    "                      <input class=\"units\" ng-switch-when=\"list\"\n" +
    "                             ng-model=\"item._unit\" autocomplete-lhc=\"::unitsAutocompLhcOpt(item)\"\n" +
    "                             placeholder=\"Select one\" aria-labelledby=\"th_Units\">\n" +
    "                      <span ng-switch-when=\"none\" > </span>\n" +
    "                    </td>\n" +
    "                    <!--<td>{{item.range}}</td>-->\n" +
    "                    <td ng-if=\"::item._horizontalTableHeader\" class=\"horizontal has_treeline\" colspan=\"5\"\n" +
    "                        ng-include=\"'h-table.html'\"></td>\n" +
    "\n" +
    "                  </tr>\n" +
    "                  <!-- extra question -->\n" +
    "                  <tr ng-if=\"::!item._inHorizontalTable && needExtra(item)\"\n" +
    "                      class=\"extra-row repeatingLine {{ getSkipLogicClass_New(item) }} {{getRowClass(item)}}\">\n" +
    "                    <td class=\"name has_treeline\">\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass2($index, item._lastSiblingList)\"\n" +
    "                              ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <span>&nbsp;</span>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                    <td class=\"button-col\"></td>\n" +
    "                    <td colspan=\"5\" class=\"extra-field\">\n" +
    "                      <input ng-model=\"item._valueOther\" placeholder=\"Please specify\" ng-readonly=\"::isReadOnly(item)\">\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  <!--a button row at the end of each repeating section-->\n" +
    "                  <tr ng-repeat-end ng-if=\"item._repeatingSectionList\"\n" +
    "                      class=\"buttonRow repeatingLine {{ getSkipLogicClass_New(item) }} {{getRowClass(item)}}\" >\n" +
    "                    <td colspan=\"6\" class=\"name has_treeline\" >\n" +
    "                      <table class=\"t-treeline-field\" >\n" +
    "                        <tr>\n" +
    "                          <td class=\"t-treeline \" ng-class=\"getExtraRowTreeLevelClass2($index, item._lastSiblingList)\"\n" +
    "                              ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "                          <td>\n" +
    "                            <div class=\"name_label\">\n" +
    "                              <button ng-repeat=\"repeatingItem in item._repeatingSectionList\"\n" +
    "                                      class=\"float-button\"  id=\"{{repeatingItem._elementId}}\"\n" +
    "                                      ng-click=\"addOneRepeatingItem_NEW(repeatingItem)\"\n" +
    "                                      title=\"Add another '{{ ::repeatingItem.question }}'\">\n" +
    "                                Add another '{{::repeatingItem.question}}'</button>\n" +
    "                            </div>\n" +
    "                          </td>\n" +
    "                        </tr>\n" +
    "                      </table>\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  </tbody>\n" +
    "                </table>\n" +
    "              </div>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "  <button ng-if=\"debug\" ng-click=\"onclick()\">Click to debug Panel Controller</button>\n" +
    "</div>\n"
  );


  $templateCache.put('h-table.html',
    "  <table class=\"t-treeline-field\" >\n" +
    "    <tr>\n" +
    "      <td class=\"t-treeline \" ng-class=\"getTreeLevelClass2($index, item._lastSiblingList)\" ng-repeat=\"lastStatus in item._lastSiblingList track by $index\"> &nbsp; </td>\n" +
    "      <td>\n" +
    "        <div class=\"name_label\">\n" +
    "          <div class=\"hTableTitle\">\n" +
    "            {{item.question}}\n" +
    "          </div>\n" +
    "\n" +
    "          <table class=\"fieldsTable horizontal-table\">\n" +
    "            <colgroup>\n" +
    "              <col style=\"width:5em; min-width: 5em;\">\n" +
    "              <col ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\">\n" +
    "            </colgroup>\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "              <th class=\"fieldsTableHeader\"></th>\n" +
    "              <th class=\"fieldsTableHeader\" ng-repeat=\"col in lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders\" id=\"{{col.id}}\">{{col.label}}</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody id=\"\" class=\"\">\n" +
    "            <tr ng-repeat=\"row in lfData._horizontalTableInfo[item._horizontalTableId].tableRows\">\n" +
    "              <td class=\"button-col\">\n" +
    "                <button ng-if=\"!hasOneRepeatingItem_NEW(item)\" class=\"float-button\"  ng-click=\"removeOneRepeatingItem_NEW(row.header)\" title=\"Remove this row of '{{ item.question }}'\">-</button>\n" +
    "                <button ng-if=\"row.header._elementId == lfData._horizontalTableInfo[item._horizontalTableId].lastHeaderId\" class=\"float-button\"  id=\"{{row.header._codePath+row.header._idPath}}\" ng-click=\"addOneRepeatingItem_NEW(row.header)\" title=\"Add another row of '{{ item.question }}'\">+</button>\n" +
    "              </td>\n" +
    "\n" +
    "              <td ng-repeat=\"cell in row.cells\" ng-switch on=\"getFieldType(cell)\" class=\"hasTooltip\">\n" +
    "                <ng-form name=\"innerForm2\">\n" +
    "                  <div class=\"cellData tooltipContainer\">\n" +
    "                    <span class=\"tooltipContent\">\n" +
    "                      <div class=\"errorMsg errorRequired\">\"{{ cell.question }}\" requires a value.</div>\n" +
    "                      <div class=\"errorMsg errorPattern\">\"{{ cell.question }}\" requires a text pattern.</div>\n" +
    "                      <div class=\"errorMsg errorMax\">\"{{ cell.question }}\" requires a maximum value of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMin\">\"{{ cell.question }}\" requires a minimum value of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMaxlength\">\"{{ cell.question }}\" requires a maximum length of ??.</div>\n" +
    "                      <div class=\"errorMsg errorMinlength\">\"{{ cell.question }}\" requires a minimum length of ??.</div>\n" +
    "                      <div class=\"errorMsg errorURL\">\"{{ cell.question }}\" requires a url.</div>\n" +
    "                      <div class=\"errorMsg errorEmail\">\"{{ cell.question }}\" requires an email.</div>\n" +
    "                      <div class=\"errorMsg errorNumber\">\"{{ cell.question }}\" requires a numeric value.</div>\n" +
    "                      <div class=\"errorMsg errorREAL\">\"{{ cell.question }}\" requires a decimal value.</div>\n" +
    "                      <div class=\"errorMsg errorINT\">\"{{ cell.question }}\" requires a integer value.</div>\n" +
    "                      <div class=\"errorMsg errorTM\">\"{{ cell.question }}\" requires a time value.</div>\n" +
    "                      <div class=\"errorMsg errorDT\">\"{{ cell.question }}\" requires a date value.</div>\n" +
    "                    </span>  <!-- validation error messages -->\n" +
    "                    <span ng-switch-when=\"\" > </span>\n" +
    "                    <input ng-switch-when=\"CNE-1\" name=\"{{cell.question + '_' + $id}}\"\n" +
    "                           ng-required=\"isAnswerRequired2(cell)\" ng-model=\"cell._value\"\n" +
    "                           autocomplete-lhc=\"autocompLhcOpt(cell)\"\n" +
    "                           ng-readonly=\"isReadOnly(cell)\" placeholder=\"Select one or more\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-when=\"CWE-1\" name=\"{{cell.question + '_' + $id}}\"\n" +
    "                           ng-required=\"isAnswerRequired2(cell)\" ng-model=\"cell._value\"\n" +
    "                           autocomplete-lhc=\"autocompLhcOpt(cell)\"\n" +
    "                           ng-readonly=\"isReadOnly(cell)\" placeholder=\"Select one or more or type a value\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-when=\"REAL1\" name=\"{{cell.question}}\" type=\"number\"\n" +
    "                           ng-required=\"isAnswerRequired(cell)\" ng-model=\"cell._value\"\n" +
    "                           placeholder=\"Type a value\" ng-readonly=\"isReadOnly(cell)\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-when=\"INT1\" name=\"{{cell.question}}\" type=\"number\"\n" +
    "                           ng-required=\"isAnswerRequired(cell)\" ng-model=\"cell._value\"\n" +
    "                           placeholder=\"Type a value\" ng-readonly=\"isReadOnly(cell)\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-when=\"CNE1\" name=\"{{cell.question + '_' + $id}}\"\n" +
    "                           ng-required=\"isAnswerRequired(cell)\" placeholder=\"Select one\"\n" +
    "                           ng-model=\"cell._value\" autocomplete-lhc=\"autocompLhcOpt(cell)\"\n" +
    "                           ng-readonly=\"isReadOnly(cell)\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-when=\"CWE1\" name=\"{{cell.question + '_' + $id}}\"\n" +
    "                           ng-required=\"isAnswerRequired(cell)\" placeholder=\"Select one or type a value\"\n" +
    "                           ng-model=\"cell._value\" autocomplete-lhc=\"autocompLhcOpt(cell)\"\n" +
    "                           ng-readonly=\"isReadOnly(cell)\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-when=\"DT1\" name=\"{{cell.question}}\"\n" +
    "                           ng-required=\"isAnswerRequired(cell)\" ng-model=\"cell._value\"\n" +
    "                           lf-date=\"dateOptions\" placeholder=\"MM/DD/YYYY\" ng-readonly=\"isReadOnly(cell)\"\n" +
    "                           id=\"{{::cell._elementId}}\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                    <input ng-switch-default name=\"{{cell.question}}\"\n" +
    "                           ng-required=\"isAnswerRequired(cell)\" ng-model=\"cell._value\"\n" +
    "                           placeholder=\"Type a value\" ng-readonly=\"isReadOnly(cell)\"\n" +
    "                           id=\"{{::cell._elementId}}\" ng-value=\"runFormula_NEW(cell)\"\n" +
    "                           aria-labelledby=\"{{lfData._horizontalTableInfo[item._horizontalTableId].columnHeaders[$index].id}}\">\n" +
    "                  </div>\n" +
    "                </ng-form>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "          </table>\n" +
    "        </div>\n" +
    "\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </table>\n"
  );


  $templateCache.put('initial.html',
    "<div class=\"loading initial\">\n" +
    "  <span>Please select a LOINC Panel from left side.<span>\n" +
    "</div>\n"
  );


  $templateCache.put('loading.html',
    "<div class=\"loading\">\n" +
    "  <span>Loading...</span>\n" +
    "</div>"
  );


  $templateCache.put('panel-search.html',
    "<div ng-controller=\"PanelSearchCtrl\">\n" +
    "  <tabset>\n" +
    "    <tab heading=\"LOINC Panels\">\n" +
    "      <div class=\"panel\">\n" +
    "        <div class=\"panel-heading\">A list of modified LOINC panels.</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <input id=\"loinc_num1\" ng-model=\"selectedPanel[0]\" ui-select2=\"panelListOpt()\">\n" +
    "          <br><br>\n" +
    "          <button type=\"button\" class=\"btn btn-primary\" ng-click=\"addMoreWidget(0)\"><span>Show Panel</span></button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </tab>\n" +
    "  </tabset>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('validation.html',
    "<div class=\"errorMsg errorRequired\">\"{{ ::item.question }}\" requires a value.</div>\n" +
    "<div class=\"errorMsg errorPattern\">\"{{ ::item.question }}\" requires a text pattern.</div>\n" +
    "<div class=\"errorMsg errorMax\">\"{{ ::item.question }}\" requires a maximum value of ??.</div>\n" +
    "<div class=\"errorMsg errorMin\">\"{{ ::item.question }}\" requires a minimum value of ??.</div>\n" +
    "<div class=\"errorMsg errorMaxlength\">\"{{ ::item.question }}\" requires a maximum length of ??.</div>\n" +
    "<div class=\"errorMsg errorMinlength\">\"{{ ::item.question }}\" requires a minimum length of ??.</div>\n" +
    "<div class=\"errorMsg errorURL\">\"{{ ::item.question }}\" requires a url.</div>\n" +
    "<div class=\"errorMsg errorEmail\">\"{{ ::item.question }}\" requires an email.</div>\n" +
    "<div class=\"errorMsg errorNumber\">\"{{ ::item.question }}\" requires a numeric value.</div>\n" +
    "<div class=\"errorMsg errorREAL\">\"{{ ::item.question }}\" requires a decimal value.</div>\n" +
    "<div class=\"errorMsg errorINT\">\"{{ ::item.question }}\" requires a integer value.</div>\n" +
    "<div class=\"errorMsg errorTM\">\"{{ ::item.question }}\" requires a time value.</div>\n" +
    "<div class=\"errorMsg errorDT\">\"{{ ::item.question }}\" requires a date value.</div>\n" +
    "<div class=\"errorMsg errorInvalidParse\">\"{{ ::item.question }}\" requires a selection from the list.</div>\n"
  );

}]);
