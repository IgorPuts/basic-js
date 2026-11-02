const { NotImplementedError } = require('../lib');

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  if (date === undefined) return 'Unable to determine the time of year!';

  // Проверка, что это настоящий Date-объект, а не подделка
  // Используем Date.prototype.getTime.call для проверки внутреннего слота [[DateValue]]
  try {
    Date.prototype.getTime.call(date);
  } catch (e) {
    throw new Error('Invalid date!');
  }

  // Дополнительная проверка на валидность даты
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date!');
  }

  // Получаем месяц через прототип, чтобы обойти возможные переопределения
  const month = Date.prototype.getMonth.call(date);

  if (month === 11 || month === 0 || month === 1) return 'winter';
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  return 'autumn';
}

module.exports = {
  getSeason
};
