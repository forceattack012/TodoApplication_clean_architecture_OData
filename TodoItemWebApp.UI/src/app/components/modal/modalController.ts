export abstract class ModalController {
  public abstract open(title: string, buttonName: string, id?: number|string): void;
  public abstract close(): void;
}
