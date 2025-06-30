const PanelStyle = require('./panel_style');

async function seedPanelStyles(){
    const data = [
        {
        nome: 'Red Theme',
        primary_color: '#FF0000',
        secondary_color: '#AA0000',
        background_color: '#FFCCCC',
        text_color: '#660000',
        title_url: 'red-theme',
    },
    {
        nome: 'Blue Theme',
        primary_color: '#0000FF',
        secondary_color: '#0000AA',
        background_color: '#CCCCFF',
        text_color: '#000066',
        title_url: 'blue-theme',
    },
    {
        nome: 'Yellow Theme',
        primary_color: '#FFFF00',
        secondary_color: '#AAAA00',
        background_color: '#FFFFCC',
        text_color: '#666600',
        title_url: 'yellow-theme',
    },
    {
        nome: 'Pink Theme',
        primary_color: '#FF69B4',
        secondary_color: '#CC5588',
        background_color: '#FFCCE5',
        text_color: '#660033',
        title_url: 'pink-theme',
        },
    ];

    try {
        for (const style of data){
            await PanelStyle.upsert(style);
        }
        console.log('Panel styles seed success.')
    } catch (err) {
        console.error('Error seeding panel styles: ', err)
    }
}

module.exports = {
    seedPanelStyles
}