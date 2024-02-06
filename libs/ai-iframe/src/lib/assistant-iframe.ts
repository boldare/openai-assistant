import { AssistantIframeConfig } from './assistant-iframe.model';
import { addIframeClass, addTriggerClass } from './assistant-iframe.styles';

export class AssistantIframe {
  config: AssistantIframeConfig;
  iframe!: HTMLIFrameElement;
  trigger!: HTMLElement;

  constructor(config: Partial<AssistantIframeConfig> = {}) {
    this.config = {
      url: config.url || '',
      elementId: config.elementId || '',
      iframeId: config.elementId || 'ai-assistant-iframe',
      iframeClass: 'ai-assistant-iframe',
      toggleClass: 'ai-assistant-toggle',
      bodyOpenClass: 'ai-assistant-open',
      toggleIsAnimated: config.toggleIsAnimated || true,
    };

    this.init();
  }

  addStyles(): void {
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>
      ${addIframeClass(this.config.iframeClass)}
      ${addTriggerClass(this.config.toggleClass)}
    </style>`,
    );
  }

  init(): void {
    this.addStyles();
    this.iframe = this.getIframe();
    this.appendElement(this.iframe);
    this.trigger = this.getTrigger();
    this.appendElement(this.trigger);
    this.onLoad();
  }

  getTrigger(): HTMLElement {
    const trigger = document.createElement('div');
    trigger.classList.add(this.config.toggleClass);

    const isAnimated = this.config.toggleIsAnimated ? 'is-animated' : '';

    if (isAnimated) {
      trigger.classList.add(isAnimated);
    }

    return trigger;
  }

  getIframe(): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.src = this.config.url;
    iframe.classList.add(this.config.iframeClass);
    iframe.id = this.config.elementId;

    return iframe;
  }

  appendElement(element: HTMLElement): void {
    if (!this.config.elementId) {
      document.body.appendChild(element);
    }

    const wrapper = document.getElementById(this.config.elementId);

    if (wrapper) {
      wrapper.appendChild(this.iframe);
    }
  }

  onLoad(): void {
    if (!this.iframe) {
      console.warn('AI Chatbot is not initialized');
      return;
    }

    this.iframe.addEventListener('load', () => {
      const currentState =
        this.iframe?.contentDocument?.body.classList.contains(
          this.config.bodyOpenClass,
        );
      this.toggleModal(!currentState);
      this.watchToggleButton();
    });
  }

  toggleModal(state: boolean): void {
    if (!state) {
      document.body.classList.add(this.config.bodyOpenClass);
      this.iframe.style.display = 'block';
    } else {
      document.body.classList.remove(this.config.bodyOpenClass);
      this.iframe.style.display = 'none';
    }
  }

  watchToggleButton(): void {
    const iframeButtons = this.iframe?.contentDocument?.getElementsByClassName(
      this.config.toggleClass,
    );
    const appButtons = document.getElementsByClassName(this.config.toggleClass);
    const buttons = [iframeButtons, appButtons];

    buttons.map(elements => {
      if (elements?.length) {
        elements[0].addEventListener('click', () => {
          const isVisible = document.body.classList.contains(
            this.config.bodyOpenClass,
          );
          this.toggleModal(isVisible);
        });
      }
    });
  }
}
