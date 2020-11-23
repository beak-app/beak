const requestSchema = {
	type: 'object',
	additionalProperties: true,

	definitions: {
		valueParts: {
			type: 'array',

			items: [
				{
					type: 'string',
				},
				{
					type: 'object',
					additionalProperties: true,

					required: [
						'type',
						'payload',
					],

					properties: {
						type: {
							type: 'string',
							enum: ['variable_group_item'],
						},

						payload: {
							type: 'object',
							additionalProperties: true,

							required: [
								'itemId',
							],

							properties: {
								itemId: {
									type: 'string',
								},
							},
						},
					},
				},
			],
		},

		keyValuePair: {
			type: 'object',
			additionalProperties: true,

			required: [
				'name',
				'value',
				'enabled',
			],

			properties: {
				name: {
					type: 'string',
					minLength: 1,
				},

				value: {
					$ref: '#/definitions/valueParts',
				},

				enabled: {
					type: 'boolean',
				},
			},
		},

		body: {
			type: 'object',
			additionalProperties: true,

			required: [
				'type',
				'payload',
			],

			properties: {
				type: {
					type: 'string',
					enum: ['text', 'json', 'url-encoded-form'],
				},

				allOf: [{
					if: {
						properties: {
							type: {
								const: 'text',
							},
						},
					},
					then: {
						properties: {
							payload: {
								type: 'string',
							},
						},
					},
				}, {
					if: {
						properties: {
							type: {
								const: 'json',
							},
						},
					},
					then: {
						properties: {
							payload: {
								type: 'string',
							},
						},
					},
				}, {
					if: {
						properties: {
							type: {
								const: 'url-encoded-form',
							},
						},
					},
					then: {
						properties: {
							payload: {
								type: 'object',

								properties: {
									$ref: '#/definitions/keyValuePair',
								},
							},
						},
					},
				}],
			},
		},
	},

	required: [
		'id',
		'verb',
		'url',
		'query',
		'headers',
	],

	properties: {
		id: {
			type: 'string',
			minLength: 1,
		},

		verb: {
			type: 'string',
		},

		url: {
			$ref: '#/definitions/valueParts',
		},

		query: {
			type: 'object',

			properties: {
				$ref: '#/definitions/keyValuePair',
			},
		},

		headers: {
			type: 'object',

			properties: {
				$ref: '#/definitions/keyValuePair',
			},
		},

		body: {
			$ref: '#/definitions/body',
		},
	},
};

export default requestSchema;
