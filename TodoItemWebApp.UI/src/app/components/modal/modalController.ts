export abstract class ModalController {
  public abstract open(title: string, buttonName: string): void;
  public abstract close(): void;
}
