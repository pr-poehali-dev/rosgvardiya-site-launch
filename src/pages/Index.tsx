import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel>('medium');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: ''
  });

  const urgencyConfig = {
    critical: { 
      label: 'Критический', 
      color: 'bg-red-600 hover:bg-red-700',
      icon: 'AlertTriangle',
      time: 'до 5 минут'
    },
    high: { 
      label: 'Высокий', 
      color: 'bg-red-500 hover:bg-red-600',
      icon: 'AlertCircle',
      time: 'до 15 минут'
    },
    medium: { 
      label: 'Средний', 
      color: 'bg-orange-500 hover:bg-orange-600',
      icon: 'Clock',
      time: 'до 30 минут'
    },
    low: { 
      label: 'Низкий', 
      color: 'bg-yellow-500 hover:bg-yellow-600',
      icon: 'Info',
      time: 'до 60 минут'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Вызов принят! Уровень срочности: ${urgencyConfig[urgencyLevel].label}. Ожидаемое время прибытия: ${urgencyConfig[urgencyLevel].time}`);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/774d25c2-edf6-45a9-906f-8b7c855eaf09.png" 
                alt="Герб Росгвардии" 
                className="w-14 h-14 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">РОСГVАРДИЯ</h1>
                <p className="text-sm text-gray-600"></p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'call', label: 'Вызов', icon: 'Phone' },
                { id: 'about', label: 'О службе', icon: 'Info' },
                { id: 'faq', label: 'Вопросы', icon: 'HelpCircle' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeSection === item.id 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section id="home" className="min-h-[80vh] flex items-center justify-center mb-24">
          <div className="text-center max-w-4xl animate-fade-in">
            <div className="mb-8 inline-block">
              <Badge className="mb-4 text-base py-2 px-6 bg-red-600 hover:bg-red-700">
                🇷🇺 Федеральная служба войск национальной гвардии
              </Badge>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-red-600">Специальная служба</span>
              <br />
              <span className="text-white [-webkit-text-stroke:2px_red] [text-stroke:2px_red]">Росгвардии</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Система быстрого реагирования на обращения граждан. 
              Квалифицированная помощь с учетом уровня срочности ситуации.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700"
                onClick={() => scrollToSection('call')}
              >Вызвать экипаж</Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-red-600 text-red-600 hover:bg-red-50"
                onClick={() => scrollToSection('about')}
              >
                <Icon name="Info" className="mr-2" size={24} />
                Подробнее
              </Button>
            </div>
          </div>
        </section>

        <section id="call" className="mb-24 scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <Card className="border-red-200 shadow-xl">
              <CardHeader className="bg-red-600 text-white rounded-t-lg">
                <CardTitle className="text-3xl flex items-center gap-3">Форма вызова сотрудника(ов)</CardTitle>
                <CardDescription className="text-red-50">
                  Укажите детали ситуации и выберите уровень срочности
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">ФИО *</Label>
                      <Input 
                        id="name" 
                        placeholder="Иванов Иван Иванович"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">ID сервера *</Label>
                      <Input 
                        id="phone" 
                        type="text"
                        placeholder="f33b-4c18"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Место проишествия *</Label>
                      <Input 
                        id="address" 
                        placeholder="Улица, дом, квартира"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Описание ситуации *</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Подробно опишите причину вызова"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4 p-6 bg-red-50 rounded-lg border border-red-200">
                    <Label className="text-lg font-semibold text-gray-900">
                      Уровень срочности *
                    </Label>
                    <RadioGroup value={urgencyLevel} onValueChange={(value) => setUrgencyLevel(value as UrgencyLevel)}>
                      {Object.entries(urgencyConfig).map(([key, config]) => (
                        <div key={key} className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 hover:border-red-300 transition-all cursor-pointer">
                          <RadioGroupItem value={key} id={key} />
                          <Label htmlFor={key} className="flex-1 cursor-pointer flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
                              <Icon name={config.icon} className="text-white" size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">{config.label}</div>
                              <div className="text-sm text-gray-600">Время прибытия: {config.time}</div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg py-6 bg-red-600 hover:bg-red-700">
                    <Icon name="Send" className="mr-2" size={20} />
                    Отправить вызов
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="about" className="mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">О службе Росгвардии</h2>
            <p className="text-xl text-gray-600">Защита прав и безопасности граждан Российской Федерации</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Shield',
                title: 'Обеспечение безопасности',
                description: 'Охрана общественного порядка и обеспечение общественной безопасности граждан'
              },
              {
                icon: 'Users',
                title: 'Профессионализм',
                description: 'Высококвалифицированные сотрудники с многолетним опытом службы'
              },
              {
                icon: 'Clock',
                title: 'Быстрое реагирование',
                description: 'Оперативное реагирование на обращения в зависимости от уровня срочности'
              }
            ].map((item, index) => (
              <Card key={index} className="border-red-200 hover:shadow-xl transition-all hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>



        <section id="faq" className="mb-24 scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Вопросы и ответы</h2>
              <p className="text-xl text-gray-600">Ответы на часто задаваемые вопросы</p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: 'В каких случаях следует вызывать сотрудника Росгвардии?',
                  answer: 'Вызов сотрудника необходим при нарушениях общественного порядка, угрозе безопасности граждан, массовых беспорядках, а также при необходимости охраны важных объектов.'
                },
                {
                  question: 'Как определяется уровень срочности вызова?',
                  answer: 'Критический уровень — угроза жизни и здоровью; Высокий — активные правонарушения; Средний — нарушения порядка без прямой угрозы; Низкий — консультационные вопросы и плановые обращения.'
                },
                {
                  question: 'Какое время реагирования на вызов?',
                  answer: 'Время зависит от уровня срочности: критический — до 5 минут, высокий — до 15 минут, средний — до 30 минут, низкий — до 60 минут.'
                },
                {
                  question: 'Нужно ли оплачивать вызов сотрудника?',
                  answer: 'Нет, услуга вызова сотрудника Росгвардии предоставляется гражданам бесплатно. Это государственная служба, финансируемая из федерального бюджета.'
                },
                {
                  question: 'Что делать после подачи вызова?',
                  answer: 'После отправки вызова оставайтесь на связи по указанному номеру телефона. При критической ситуации примите меры для обеспечения личной безопасности. Ожидайте прибытия наряда.'
                }
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-red-200 rounded-lg px-6 bg-white">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-3">
                      <Icon name="HelpCircle" className="text-red-600 mt-1" size={20} />
                      <span className="font-semibold text-gray-900">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pl-9">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>


      </main>

      <footer className="bg-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/774d25c2-edf6-45a9-906f-8b7c855eaf09.png" 
                  alt="Герб Росгвардии" 
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold">Росгвардия</h3>
                  <p className="text-sm text-red-100">Служба вызова</p>
                </div>
              </div>
              <p className="text-red-100">
                Федеральная служба войск национальной гвардии Российской Федерации
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
              <ul className="space-y-2 text-red-100">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Главная</button></li>
                <li><button onClick={() => scrollToSection('call')} className="hover:text-white transition-colors">Вызов сотрудника</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">О службе</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">Вопросы и ответы</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Экстренные службы</h4>
              <ul className="space-y-2 text-red-100">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>МЧС: 112</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>Полиция: 102</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>Скорая помощь: 103</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-red-500 pt-8 text-center text-red-100">
            <p>© 2024 Федеральная служба войск национальной гвардии РФ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;