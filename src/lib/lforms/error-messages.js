/**
 *  A class for retrieving error messages (or warnings or info messages).
 *  These messages are intended to be about things that happened, not about
 *  validation, because there is no good way to remove the old messages when
 *  they don't apply without adversely impacting peformance.
 */

export const ErrorMessages = {
  messages: {
    'comparatorInQuantity': {
      'en': 'Questo articolo non puo\' accettare una quantita\' con un comparatore'
    },
    'nonMatchingQuantityUnit': {
      'en': 'Si è tentato di assegnare una quantità con un \'unita\' non corrispondente.'
    },
    'MultipleValuesForNonRepeat': {
      'en': 'E\' stato effettuato un tentativo di assegnare piu\' valori a un elemento non ripetitivo.'
    }
  },


  /**
   *  Returns the text for a message.
   * @param messageID the id of the message
   * @return the text corresponding to messageID.
   */
  getMsg: function (messageID) {
    const messageData = this.messages[messageID];
    if (!messageData)
      throw new Error('Unknown message ID "' +messageID+'"');
    const message = messageData[this.language];
    if (!message)
      throw new Error('Unknown language code "'+this.language+'" for message ID "' +messageID+'"');
    return message;
  },


  /**
   *  Adds the message with the given ID to the given message object.
   * @param msgObj an object to which the message will be added, with the given
   * messageID as the key and the text as the value.
   * @param messageID the id of the message
   */
  addMsg: function (msgObj, messageID) {
    msgObj[messageID] = this.getMsg(messageID);
  },


  /**
   *  Sets the language code used by getMsg.
   * @param language the language code for the message.  This must be one of the
   *  languages of the messages above.
   */
  setLanguage: function (language) {
    this.language = language;
  }
};
