import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Globe, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-ocean-50 dark:from-background">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Globe className="h-6 w-6 text-ocean-600 group-hover:text-ocean-700 transition-colors" />
              <span className="font-bold text-lg bg-gradient-to-r from-ocean-700 to-ocean-500 bg-clip-text text-transparent">
                TravelEase
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Khám phá thế giới với những trải nghiệm du lịch được tuyển chọn, lịch trình được cá
              nhân hóa và những ưu đãi độc quyền.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-muted-foreground hover:text-ocean-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-muted-foreground hover:text-ocean-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-muted-foreground hover:text-ocean-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="text-muted-foreground hover:text-ocean-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-ocean-700 dark:text-ocean-400">Công ty</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Cơ hội nghề nghiệp
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Báo chí
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-ocean-700 dark:text-ocean-400">Điểm đến</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/destinations/hue"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Huế
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/ha-long"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Hạ Long
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/mekong"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Sông Mekong
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/sapa"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Sa Pa
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/ha-noi"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Hà Nội
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/ho-chi-minh"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  TP Hồ Chí Minh
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-ocean-700 dark:text-ocean-400">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-muted-foreground hover:text-ocean-600 transition-colors"
                >
                  Khả năng tiếp cận
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <h3 className="text-sm font-medium text-ocean-700 dark:text-ocean-400">Đăng ký</h3>
            <p className="text-sm text-muted-foreground">
              Đăng ký bản tin của chúng tôi để nhận các mẹo du lịch và ưu đãi độc quyền.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Địa chỉ email"
                type="email"
                className="max-w-[220px] border-ocean-200 focus-visible:ring-ocean-500"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-ocean-600 hover:bg-ocean-700 text-white"
              >
                Đăng ký
              </Button>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-ocean-500" />
                <span>Hà Nội, Việt Nam</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-ocean-500" />
                <span>contact@travelease.vn</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-ocean-500" />
                <span>+84 (24) 1234-5678</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-ocean-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TravelEase. Bảo lưu mọi quyền.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/terms" className="hover:text-ocean-600 transition-colors">
              Điều khoản
            </Link>
            <Link href="/privacy" className="hover:text-ocean-600 transition-colors">
              Bảo mật
            </Link>
            <Link href="/cookies" className="hover:text-ocean-600 transition-colors">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
