module.exports = function (plop) {
	// section generator
	plop.setGenerator('section', {
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
				templateFile: 'plop-templates/section.liquid'
			}
		]
	})
	// section generator
	plop.setGenerator('template', {
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
	plop.setGenerator('template-w-section', {
		description: 'Create template with main section',
		prompts: [
			{
				type: 'input',
				name: 'templateName',
				message: 'Template name please. ie: (page.template)'
			},
			{
				type: 'input',
				name: 'sectionName',
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
				path: 'sections/{{sectionName}}.liquid',
				templateFile: 'plop-templates/section.liquid'
			}
		]
	})
	plop.setHelper('toLowerCase', str => str.toLowerCase())
	plop.setHelper('curlyWrap', str => '{{' + str + '}}')
	plop.setHelper('toTitle', str => {
		var words = str.split('-');

		for (var i = 0; i < words.length; i++) {
			var word = words[i]
			words[i] = word.charAt(0).toUpperCase() + word.slice(1)
		}

		return words.join(' ')
	})
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