const requireUncached = require('require-uncached');
import rp from 'request-promise'
import mainTemplate from './src/templates/main.html!text'
import 'svelte/ssr/register'

const Page = requireUncached('../src/components/page/render.html')

export async function render() {
    const data = await rp({
        //uri: 'https://interactive.guim.co.uk/docsdata-test/1P-6YwejZEA68ZzJVsJV0_jWJL-7uYOwEzFRi_UTSdfU.json',
        // uri: 'https://interactive.guim.co.uk/docsdata-test/1pAzeqyyGTs9wjz0nVj9Cz0LKeTlLU2OhJwYLB4Z9XXY.json',
        uri: 'https://interactive.guim.co.uk/docsdata/19LICrzTF3BhjhInB5PinMh0lHSfaeX7Mbj5giWMpluQ.json',
        json: true
    });

    const related = await rp({
        //uri: 'https://interactive.guim.co.uk/docsdata-test/1P-6YwejZEA68ZzJVsJV0_jWJL-7uYOwEzFRi_UTSdfU.json',
        // uri: 'https://interactive.guim.co.uk/docsdata-test/1pAzeqyyGTs9wjz0nVj9Cz0LKeTlLU2OhJwYLB4Z9XXY.json',
        uri: 'https://api.nextgen.guardianapps.co.uk/related/environment/2019/jun/07/oceans-demise-the-end-of-the-arctic-as-we-know-it.json?exclude-tag=tone/advertisement-features&exclude-tag=guardian-professional/guardian-professional',
        json: true
    }).html;



    const html = Page.render({
        serverside: true,
        blocks: data.blocks,
        related: related
    });

    return html;
}
