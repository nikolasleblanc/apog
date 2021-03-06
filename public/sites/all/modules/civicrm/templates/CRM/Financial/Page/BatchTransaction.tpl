{*
 +--------------------------------------------------------------------+
 | CiviCRM version 4.3                                                |
 +--------------------------------------------------------------------+
 | Copyright CiviCRM LLC (c) 2004-2013                                |
 +--------------------------------------------------------------------+
 | This file is a part of CiviCRM.                                    |
 |                                                                    |
 | CiviCRM is free software; you can copy, modify, and distribute it  |
 | under the terms of the GNU Affero General Public License           |
 | Version 3, 19 November 2007 and the CiviCRM Licensing Exception.   |
 |                                                                    |
 | CiviCRM is distributed in the hope that it will be useful, but     |
 | WITHOUT ANY WARRANTY; without even the implied warranty of         |
 | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.               |
 | See the GNU Affero General Public License for more details.        |
 |                                                                    |
 | You should have received a copy of the GNU Affero General Public   |
 | License and the CiviCRM Licensing Exception along                  |
 | with this program; if not, contact CiviCRM LLC                     |
 | at info[AT]civicrm[DOT]org. If you have questions about the        |
 | GNU Affero General Public License or the licensing of CiviCRM,     |
 | see the CiviCRM license FAQ at http://civicrm.org/licensing        |
 +--------------------------------------------------------------------+
*}

<div id="enableDisableStatusMsg" class="crm-container" style="display:none;"></div>
<table id="batch-summary" cellpadding="0" cellspacing="0" border="0" class="report crm-batch_summary">
  <thead class="sticky">
    <tr>
     {foreach from=$columnHeaders item=head}
       <th>{$head}</th>
     {/foreach}
    </tr>
  </thead>
  <tbody>
    <tr>
      {foreach from=$columnHeaders item=head key=rowKey}
        <td id="row_{$rowKey}" class="even-row"></td>
      {/foreach}
    </tr>
  </tbody>
</table>

<div class="crm-submit-buttons">{if $statusID eq 1}{$form.close_batch.html}{/if} {$form.export_batch.html}</div>

{if $statusID eq 1} {* Add / remove transactions only allowed for Open batches *}
  <br /><div class="form-layout-compressed">{$form.trans_remove.html}&nbsp;{$form.rSubmit.html}</div><br/>
{/if}

<div id="ltype">
  <p></p>
  <div class="form-item">
  {strip}
    <table id="crm-transaction-selector-remove" cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th class="crm-transaction-checkbox">{if $statusID eq 1}{$form.toggleSelects.html}{/if}</th>
          <th class="crm-contact-type"></th>
          <th class="crm-contact-name">{ts}Name{/ts}</th>
          <th class="crm-amount">{ts}Amount{/ts}</th>
	  <th class="crm-trxnID">{ts}Trxn ID{/ts}</th>
          <th class="crm-received">{ts}Received{/ts}</th>
          <th class="crm-payment-method">{ts}Pay Method{/ts}</th>
	  <th class="crm-status">{ts}Status{/ts}</th>
          <th class="crm-type">{ts}Type{/ts}</th>
          <th class="crm-transaction-links"></th>
        </tr>
      </thead>
    </table>
  {/strip}
  </div>
</div>
<br/>
{include file="CRM/Financial/Form/BatchTransaction.tpl"}

{literal}
<script type="text/javascript">
cj( function() {
  var entityID = {/literal}{$entityID}{literal};
  batchSummary(entityID);
  cj('#close_batch').click( function() {
    assignRemove(entityID, 'close');
    return false;
  });
  cj('#export_batch').click( function() {
    assignRemove(entityID, 'export');
    return false;
  });
});
function assignRemove(recordID, op) {
  var recordBAO = 'CRM_Batch_BAO_Batch';
  var entityID = {/literal}"{$entityID}"{literal};
  if (op == 'close' || op == 'export') {
    var mismatch = checkMismatch();
  }
  else {
    cj('#mark_x_' + recordID).closest('tr').block({message: {/literal}'{ts escape="js"}Updating{/ts}'{literal}});
  }
  if (op == 'close' || (op == 'export' && mismatch.length)) {
    cj("#enableDisableStatusMsg").dialog({
      title: {/literal}'{ts escape="js"}Close Batch{/ts}'{literal},
      modal: true,
      bgiframe: true,
      overlay: {
        opacity: 0.5,
        background: "black"
      },
      open:function() {
        if (op == 'close') {
          var msg = {/literal}'{ts escape="js"}Are you sure you want to close this batch?{/ts}'{literal};
        }
        else {
          var msg = {/literal}'{ts escape="js"}Are you sure you want to close and export this batch?{/ts}'{literal};
        }
        cj('#enableDisableStatusMsg').show().html(msg + mismatch);
      },
      buttons: {
        {/literal}"{ts escape='js'}Cancel{/ts}"{literal}: function() {
          cj(this).dialog("close");
        },
        {/literal}"{ts escape='js'}OK{/ts}"{literal}: function() {
          cj(this).dialog("close");
          saveRecord(recordID, op, recordBAO, entityID);
        }
      }
    });
  }
  else {
    saveRecord(recordID, op, recordBAO, entityID);
  }
}

function noServerResponse() {
  CRM.alert({/literal}'{ts escape="js"}No response from the server. Check your internet connection and try reloading the page.{/ts}', '{ts escape="js"}Network Error{/ts}'{literal}, 'error');
}

function saveRecord(recordID, op, recordBAO, entityID) {
  if (op == 'export') {
    window.location.href = CRM.url('civicrm/financial/batch/export', {reset: 1, id: recordID, status: 1});
    return;
  }
  var postUrl = {/literal}"{crmURL p='civicrm/ajax/rest' h=0 q='className=CRM_Financial_Page_AJAX&fnName=assignRemove'}"{literal};
  //post request and get response
  cj.post( postUrl, { records: [recordID], recordBAO: recordBAO, op:op, entityID:entityID, key: {/literal}"{crmKey name='civicrm/ajax/ar'}"{literal}  }, function( html ){
    //this is custom status set when record update success.
    if (html.status == 'record-updated-success') {
       if (op == 'close') {
         window.location.href = CRM.url('civicrm/financial/financialbatches', 'reset=1&batchStatus=2');
       }
       else {
         buildTransactionSelectorAssign( true );
         buildTransactionSelectorRemove();
         batchSummary(entityID);
       }
    }
    else {
      CRM.alert(html.status);
    }
  },
  'json').error(noServerResponse);
}

function batchSummary(entityID) {
  var postUrl = {/literal}"{crmURL p='civicrm/ajax/rest' h=0 q='className=CRM_Financial_Page_AJAX&fnName=getBatchSummary'}"{literal};
  //post request and get response
  cj.post( postUrl, {batchID: entityID}, function(html) {
    cj.each(html, function(i, val) {
      cj("#row_" + i).html(val);
    });
  },
  'json');
}

function checkMismatch() {
  var txt = '';
  var enteredItem = cj("#row_item_count").text();
  var assignedItem = cj("#row_assigned_item_count").text();
  var enteredTotal = cj("#row_total").text();
  var assignedTotal = cj("#row_assigned_total").text();
  if (enteredItem != "" && enteredItem != assignedItem) {
     txt = '{/literal}<div class="messages crm-error"><strong>Item Count mismatch:</strong><br/>{ts escape="js"}Expected{/ts}:' + enteredItem +'<br/>{ts escape="js"}Current Total{/ts}:' + assignedItem + '</div>{literal}';
  }
  if (enteredTotal != "" && enteredTotal != assignedTotal) {
     txt += '{/literal}<div class="messages crm-error"><strong>Total Amount mismatch</strong><br/>{ts escape="js"}Expected{/ts}:' + enteredTotal +'<br/>{ts escape="js"}Current Total{/ts}:' + assignedTotal + '</div>{literal}';
  }
  if (txt.length) {
    txt += {/literal}'<div class="messages status">{ts escape="js"}Click OK to override and update expected values.{/ts}</div>'{literal}
  }
  return txt;
}
</script>
{/literal}
