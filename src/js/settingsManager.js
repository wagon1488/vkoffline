/* ==========================================================
 * Settings Manager (VK Offline Chrome app)
 * https://github.com/1999/vkoffline
 * ==========================================================
 * Copyright 2013 Dmitry Sorin <info@staypositive.ru>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

var SettingsManager = new (function() {
	// загружаем данные из LS
	var internalSettings = StorageManager.get("settings", {constructor: Object, strict: true, create: true});

	// устанавливаем геттеры и сеттеры для данных
	[
		{
			key: "Debug", // debug-level
			defaultValue: 0,
			allowedValues: [0, 1, 2], // [error,warn], [error,warn,log], [error,warn,log,info]
			valueType: "integer"
		},
		{
			key: "SortContacts", // сортировка контактов
			defaultValue: 0,
			allowedValues: [0, 1, 2], // по дате последней переписки, по частоте переписки, по алфавиту
			valueType: "integer"
		},
		{
			key: "DeleteUser", // как удалять пользователя
			defaultValue: 0,
			allowedValues: [0, 1, 2], // локально, то же + очистить переписку ВКонтакте, то же + удалить из друзей ВКонтакте
			valueType: "integer"
		},
		{
			key: "SoundLevel", // громкость звуков
			defaultValue: 0.8,
			allowedValues: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
			valueType: "float"
		},
		{
			key: "NotificationsTime", // время жизни всплывающих уведомлений
			defaultValue: 2,
			allowedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 0 - не показывать, 12 - не скрывать
			valueType: "integer"
		},
		{
			key: "ShowWhenVK", // показывать уведомления при открытой вкладке ВКонтакте
			defaultValue: 0,
			allowedValues: [0, 1],
			valueType: "integer"
		},
		{
			key: "ShowBirthdayNotifications", // показывать уведомления о ДР
			defaultValue: 1,
			allowedValues: [0, 1],
			valueType: "integer"
		},
		{
			key: "AttachGeolocation", // добавлять геометку к отправляемым сообщениям
			defaultValue: 0,
			allowedValues: [0, 1],
			valueType: "integer"
		},
		{
			key: "ShowOnline", // показывать онлайн-статус контактов
			defaultValue: 0,
			allowedValues: [0, 1],
			valueType: "integer"
		}
	].forEach(function (settingElem) {
		this.__defineGetter__(settingElem.key, function () {
			var outputValue;

			if (internalSettings[settingElem.key] !== undefined) {
				switch (settingElem.valueType) {
					case "integer" :
						outputValue = parseInt(internalSettings[settingElem.key], 10);
						break;

					case "float" :
						outputValue = parseFloat(internalSettings[settingElem.key]);
						break;

					case "string" :
						outputValue = internalSettings[settingElem.key] + "";
						break;
				}

				if (settingElem.allowedValues.indexOf(outputValue) !== -1) {
					return outputValue;
				}
			}

			return settingElem.defaultValue;
		});

		this.__defineSetter__(settingElem.key, function (value) {
			var outputValue;

			switch (settingElem.valueType) {
				case "integer" :
					outputValue = parseInt(value, 10);
					break;

				case "float" :
					outputValue = parseFloat(value);
					break;

				case "string" :
					outputValue = value + "";
					break;
			}

			internalSettings[settingElem.key] = (settingElem.allowedValues.indexOf(outputValue) !== -1)
				? outputValue
				: settingElem.defaultValue;

			StorageManager.set("settings", internalSettings);
		});
	}, this);
});
