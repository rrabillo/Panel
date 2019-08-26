export default class Panel{

    constructor(element){

        this.$panel = element;
        this.id = this.$panel.data('panel-id');
        this.$triggers = $('.js-panel-trigger[data-panel-id="'+this.id+'"]');
        this.$wrapper = $('.js-panel-content-wrapper');
        this.$overlay = this.$panel.find('.js-panel-overlay');
        this.$close = this.$panel.find('.js-panel-close');
        this.$panelContent = this.$panel.find('.js-panel-content-wrapper');
        this.$loader = this.$panel.find('.js-panel-loader');

        this.bindEvents();
    }


    bindEvents(){
        this.$triggers.on('click', this.openPanel.bind(this));
        this.$overlay.on('click', this.closePanel.bind(this));
        this.$close.on('click', this.closePanel.bind(this));
    }


    openPanel(e){
        let $currentTrigger = $(e.currentTarget);

        this.$panel.addClass('is-shown');

        // If panel content must be loaded trought ajax
        if($currentTrigger.data('ajax-url')){
            this.$panelContent.html('');
            this.$loader.show();
            this.getData($currentTrigger.data('ajax-url'));
        }
    }

    closePanel(){
        this.$panel.removeClass('is-shown');
    }

    getData($url){
        $.ajax({
            url:$url,
            type : 'GET',
            dataType:'html',
            success: (content, status) => {
                this.$loader.hide();
                this.$panelContent.html(content);
            }
        })
    }
}
