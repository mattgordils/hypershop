module.exports = function (plop) {
	// section generator
	plop.setGenerator('section-shopify', {
		description: 'Create section',
		prompts: [
			{
				type: 'input',
				name: 'sectionName',
				message: 'Section name please. ie: (section-name)'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'sections/{{sectionName}}.liquid',
				templateFile: 'plop-templates/section.liquid.hbs'
			}
		]
	})
	// section generator
	plop.setGenerator('template-shopify', {
		description: 'Create template',
		prompts: [
			{
				type: 'input',
				name: 'templateName',
				message: 'Template name please. ie: (page.template)'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'templates/{{templateName}}.json',
				templateFile: 'plop-templates/template.json.hbs'
			}
		]
	})
	// section generator
	plop.setGenerator('template-w-section-shopify', {
		description: 'Create template',
		prompts: [
			{
				type: 'input',
				name: 'templateName',
				message: 'Template name please. ie: (page.template)'
			},
			{
				type: 'input',
				name: 'templateMainName',
				message: 'Section name please. ie: (main-section)'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'templates/{{templateName}}.json',
				templateFile: 'plop-templates/template.json.hbs'
			},
			{
				type: 'add',
				path: 'sections/{{templateMainName}}.liquid',
				templateFile: 'plop-templates/section.liquid.hbs'
			}
		]
	})
	plop.setHelper('toLowerCase', str => str.toLowerCase())
	plop.setHelper('titleCase', str => {
		if (typeof str === 'undefined') {
			return ''
		}

		return (
			str.replace(
				/\w\S*/g,
				txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
			)
		)
	})
}
