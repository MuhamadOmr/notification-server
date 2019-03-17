/**
 * just a string message customizer based on sending notifications
 *
 * @class MessageCustomizer
 * @extends {String}
 */
class MessageCustomizer extends String {
  /**
   * replace country from notification message
   *
   * @param {string} [countryName='Earth']
   * @returns
   * @memberof MessageCustomizer
   */
  replaceCountry(countryName = 'Earth') {
    return this.includes('{country}')
      ? new MessageCustomizer(this.replace(/{country}/g, countryName))
      : new MessageCustomizer(this);
  }

  /**
   * replace name from notification message
   *
   * @param {string} [name='there']
   * @returns
   * @memberof MessageCustomizer
   */
  replaceName(name = 'there') {
    return this.includes('{name}')
      ? new MessageCustomizer(this.replace(/{name}/g, name))
      : new MessageCustomizer(this);
  }
}

module.exports = MessageCustomizer;
