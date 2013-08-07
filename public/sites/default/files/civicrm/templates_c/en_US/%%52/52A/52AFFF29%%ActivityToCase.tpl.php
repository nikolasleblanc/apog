<?php /* Smarty version 2.6.27, created on 2013-08-07 13:45:34
         compiled from CRM/Case/Form/ActivityToCase.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'ts', 'CRM/Case/Form/ActivityToCase.tpl', 35, false),array('function', 'crmURL', 'CRM/Case/Form/ActivityToCase.tpl', 57, false),array('function', 'crmKey', 'CRM/Case/Form/ActivityToCase.tpl', 145, false),)), $this); ?>
<div id="fileOnCaseDialog"></div>

<?php if (! empty ( $this->_tpl_vars['buildCaseActivityForm'] )): ?>
<div class="crm-block crm-form-block crm-case-activitytocase-form-block">
<table class="form-layout">
     <tr class="crm-case-activitytocase-form-block-unclosed_cases">
      <td class="label"><?php echo $this->_tpl_vars['form']['unclosed_cases']['label']; ?>
</td>
       <td><?php echo $this->_tpl_vars['form']['unclosed_cases']['html']; ?>
<br />
           <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Begin typing client name for a list of open cases.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
       </td>
     </tr>
     <tr class="crm-case-activitytocase-form-block-target_contact_id">
      <td class="label"><?php echo $this->_tpl_vars['form']['target_contact_id']['label']; ?>
</td>
      <td><?php echo $this->_tpl_vars['form']['target_contact_id']['html']; ?>
</td>
     </tr>
     <tr class="crm-case-activitytocase-form-block-case_activity_subject">
       <td class="label"><?php echo $this->_tpl_vars['form']['case_activity_subject']['label']; ?>
</td>
      <td><?php echo $this->_tpl_vars['form']['case_activity_subject']['html']; ?>
<br />
          <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>You can modify the activity subject before filing.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
      </td>
     </tr>
</table>
</div>
<?php echo '
<script type="text/javascript">
var target_contact = \'\';
var target_contact_id = \'\';
var selectedCaseId = \'\';
var contactId = \'\';

var unclosedCaseUrl = '; ?>
"<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/case/ajax/unclosed','h' => 0,'q' => 'excludeCaseIds='), $this);?>
<?php echo $this->_tpl_vars['currentCaseId']; ?>
"<?php echo ';
cj( "#unclosed_cases" ).autocomplete( unclosedCaseUrl, { width : 250, selectFirst : false, matchContains:true
                                    }).result( function(event, data, formatted) {
                                cj( "#unclosed_case_id" ).val( data[1] );
                          contactId = data[2];
                          selectedCaseId = data[1];
                                              }).bind( \'click\', function( ) {
                                cj( "#unclosed_case_id" ).val(\'\');
              contactId = selectedCaseId = \'\';
                            });
'; ?>

<?php if ($this->_tpl_vars['targetContactValues']): ?>
<?php $_from = $this->_tpl_vars['targetContactValues']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['id'] => $this->_tpl_vars['name']):
?>
   <?php echo '
   target_contact += \'{"name":"\'+'; ?>
"<?php echo $this->_tpl_vars['name']; ?>
"<?php echo '+\'","id":"\'+'; ?>
"<?php echo $this->_tpl_vars['id']; ?>
"<?php echo '+\'"},\';'; ?>

<?php endforeach; endif; unset($_from); ?>
   <?php echo '
   eval( \'target_contact = [\' + target_contact + \']\');
   '; ?>

<?php endif; ?>

<?php if ($this->_tpl_vars['form']['target_contact_id']['value']): ?>
     <?php echo '
     var toDataUrl = "'; ?>
<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/ajax/checkemail','q' => 'id=1&noemail=1','h' => 0), $this);?>
<?php echo '";
     var target_contact_id = cj.ajax({ url: toDataUrl + "&cid='; ?>
<?php echo $this->_tpl_vars['form'][$this->_tpl_vars['currentElement']]['value']; ?>
<?php echo '", async: false }).responseText;
     '; ?>

<?php endif; ?>

<?php echo '
if ( target_contact_id ) {
  eval( \'target_contact = \' + target_contact_id );
}

var tokenDataUrl  = "'; ?>
<?php echo $this->_tpl_vars['tokenUrl']; ?>
<?php echo '";
var hintText = "'; ?>
<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Type in a partial or complete name or email address of an existing contact.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '";
cj( "#target_contact_id" ).tokenInput(tokenDataUrl,{prePopulate: target_contact, theme: \'facebook\', hintText: hintText });
cj( \'ul.token-input-list-facebook, div.token-input-dropdown-facebook\' ).css( \'width\', \'450px\' );

cj( "#fileOnCaseDialog" ).hide( );

</script>
'; ?>


<?php endif; ?> 
<?php echo '
<script type="text/javascript">
function fileOnCase( action, activityID, currentCaseId ) {
    if ( action == "move" ) {
        dialogTitle = "Move to Case";
    } else if ( action == "copy" ) {
        dialogTitle = "Copy to Case";
    } else if ( action == "file" ) {
        dialogTitle = "File On Case";
    }

    var dataUrl = '; ?>
"<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/case/addToCase','q' => 'reset=1&snippet=4','h' => 0), $this);?>
"<?php echo ';
    dataUrl = dataUrl + \'&activityId=\' + activityID + \'&caseId=\' + currentCaseId + \'&cid=\' + '; ?>
"<?php echo $this->_tpl_vars['contactID']; ?>
"<?php echo ';

    cj.ajax({
              url     : dataUrl,
        success : function ( content ) {
                   cj("#fileOnCaseDialog").show( ).html( content ).dialog({
                 title       : dialogTitle,
                 modal       : true,
           bgiframe    : true,
                     width       : 600,
                 height      : 270,
           close       : function( event, ui ) { cj( "#unclosed_cases" ).unautocomplete( ); },
                 overlay     : { opacity: 0.5, background: "black" },
                 beforeclose : function( event, ui ) {
                                     cj(this).dialog("destroy");
                                   },
                   open        : function() {  },

        buttons : {
      "Ok": function() {
        var subject         = cj("#case_activity_subject").val( );
        var targetContactId = cj("#target_contact_id").val( );

          if ( !cj("#unclosed_cases").val( )  ) {
             cj("#unclosed_cases").crmError(\''; ?>
<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Please select a case from the list<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '.\');
           return false;
        }

        cj(this).dialog("destroy");

        var postUrl = '; ?>
"<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/ajax/activity/convert','h' => 0), $this);?>
"<?php echo ';
              cj.post( postUrl, { activityID: activityID, caseID: selectedCaseId, contactID: contactId, newSubject: subject, targetContactIds: targetContactId, mode: action, key: '; ?>
"<?php echo smarty_function_crmKey(array('name' => 'civicrm/ajax/activity/convert'), $this);?>
"<?php echo ' },
           function( values ) {
                if ( values.error_msg ) {
                    cj().crmError(values.error_msg, "'; ?>
<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Unable to file on case<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '.");
                 return false;
                          } else {
                    var destUrl = '; ?>
"<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/contact/view/case','q' => 'reset=1&action=view&id=','h' => 0), $this);?>
"<?php echo ';
                  var context = \'\';
                  '; ?>
<?php if (! empty ( $this->_tpl_vars['fulltext'] )): ?><?php echo '
                    context = \'&context='; ?>
<?php echo $this->_tpl_vars['fulltext']; ?>
<?php echo '\';
                  '; ?>
<?php endif; ?><?php echo '
                  var caseUrl = destUrl + selectedCaseId + \'&cid=\' + contactId + context;
                  var redirectToCase = false;
                  var reloadWindow = false;
                  if ( action == \'move\' ) redirectToCase = true;
                  if ( action == \'file\' ) {
                     var curPath = document.location.href;
                      if ( curPath.indexOf( \'civicrm/contact/view\' ) != -1 ) {
                                    //hide current activity row.
                                    cj( "#crm-activity_" + activityID ).hide( );
                      var visibleRowCount = 0;
                      cj(\'[id^="\'+ \'crm-activity\' +\'"]::visible\').each(function() {
                            visibleRowCount++;
                      } );
                      if ( visibleRowCount < 1 ) {
                         reloadWindow = true;
                      }
                                 }
                                 if ( ( curPath.indexOf( \'civicrm/contact/view/activity\' ) != -1 ) ||
                                      ( curPath.indexOf( \'civicrm/activity\' ) != -1 ) ) {
                                     redirectToCase = true;
                                 }
                              }

                  if ( redirectToCase ) {
                                 window.location.href = caseUrl;
                  } else if ( reloadWindow ) {
                      window.location.reload( );
                  } else {
                      var activitySubject = cj("#case_activity_subject").val( );
                      var statusMsg = activitySubject + \'" has been filed to selected case: <a href="\' + caseUrl + \'">\' + cj("#unclosed_cases").val( ) + \'</a>.\';
                      CRM.alert(statusMsg, \''; ?>
<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Activity Filed<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '\', \'success\');

                             }
                   }
                    }
              );
      },

      "Cancel": function() {
        cj(this).dialog("close");
        cj(this).dialog("destroy");
      }
    }

     });
       }
  });
}
</script>
'; ?>
