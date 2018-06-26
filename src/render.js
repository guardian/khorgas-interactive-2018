const requireUncached = require('require-uncached');
import rp from 'request-promise'
import mainTemplate from './src/templates/main.html!text'
import 'svelte/ssr/register'

const Page = requireUncached('../src/components/page/render.html')

export async function render() {
    const data = await rp({
        //uri: 'https://interactive.guim.co.uk/docsdata-test/1P-6YwejZEA68ZzJVsJV0_jWJL-7uYOwEzFRi_UTSdfU.json',
        uri: 'https://interactive.guim.co.uk/docsdata-test/1PQpJPmf090eXCxRbsxPZJH6QCfElZx0MguTfg94qft0.json',
        json: true
    });

    const html = Page.render({
        serverside: true,
        blocks: data.blocks
    });

    return html;
}
