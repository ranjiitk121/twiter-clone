import { Container } from "inversify";

export class Bootstrap {
    static container = new Container();
    static init (services: any[], repositories: any[]) {
        services.forEach(service => {
            Bootstrap.container.bind(service.name).to(service);
        });
        
        repositories.forEach(repository => {
            Bootstrap.container.bind(repository.name).to(repository);
        });
        console.log(services);
    }
}
