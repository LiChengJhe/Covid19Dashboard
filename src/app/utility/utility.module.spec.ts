import { UtilityModule } from './utility.module';

describe('UtilityModule', () => {
  let utilitiesModule: UtilityModule;

  beforeEach(() => {
    utilitiesModule = new UtilityModule();
  });

  it('should create an instance', () => {
    expect(utilitiesModule).toBeTruthy();
  });
});
