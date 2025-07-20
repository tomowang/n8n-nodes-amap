import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class AMap implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AMap高德地图',
		name: 'aMap',
		icon: 'file:amap.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Get information from AMap',
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		defaults: {
			name: 'AMap高德地图',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: 'weather',
				noDataExpression: true,
				options: [
					{
						name: '天气',
						value: 'weather',
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				default: 'getWeather',
				noDataExpression: true,
				options: [
					{
						name: '获取实况天气',
						value: 'getWeather',
						action: '获取实况天气',
						routing: {
							request: {
								method: 'GET',
								url: '/weather/weatherInfo',
								qs: {
									city: '={{$parameter["city"]}}',
									extensions: 'base',
								},
							},
						},
					},
					{
						name: '获取预报天气',
						value: 'getForecast',
						action: '获取预报天气',
						routing: {
							request: {
								method: 'GET',
								url: '/weather/weatherInfo',
								qs: {
									city: '={{$parameter["city"]}}',
									extensions: 'all',
								},
							},
						},
					},
				],
			},
			{
				displayName: '城市编码',
				name: 'city',
				type: 'string',
				default: '110000',
				required: true,
				displayOptions: {
					show: {
						resource: ['weather'],
					},
				},
			},
		],
		credentials: [
			{
				name: 'amapApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://restapi.amap.com/v3',
			qs: {
				output: 'JSON',
			},
		},
	};
}
