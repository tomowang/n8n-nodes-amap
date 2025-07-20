import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class AMapApi implements ICredentialType {
	name = 'amapApi';
	displayName = 'AMap API';
	documentationUrl = 'https://lbs.amap.com/api/webservice/create-project-and-key';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				key: '={{$credentials.apiKey}}',
			},
		},
	};
}
